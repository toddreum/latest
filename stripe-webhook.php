<?php
/**
 * BirdTurds Stripe Webhook Handler v40.6
 * Handles payment events from Stripe and credits coins to users
 */

// Load secure configuration
$configPath = '/home/birdturds/private/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    die(json_encode(['error' => 'Server configuration error']));
}
require_once $configPath;

// Set headers
header('Content-Type: application/json');

// Get the raw POST body
$payload = file_get_contents('php://input');
$sigHeader = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';

// Verify webhook signature
if (!verifyStripeSignature($payload, $sigHeader)) {
    http_response_code(400);
    die(json_encode(['error' => 'Invalid signature']));
}

// Parse the event
$event = json_decode($payload, true);

if (!$event || !isset($event['type'])) {
    http_response_code(400);
    die(json_encode(['error' => 'Invalid event']));
}

// Log the event
error_log("Stripe webhook received: " . $event['type']);

// Handle the event
switch ($event['type']) {
    case 'checkout.session.completed':
        handleCheckoutComplete($event['data']['object']);
        break;
        
    case 'payment_intent.succeeded':
        error_log("Payment succeeded: " . ($event['data']['object']['id'] ?? 'unknown'));
        break;
        
    case 'payment_intent.payment_failed':
        error_log("Payment failed: " . ($event['data']['object']['last_payment_error']['message'] ?? 'unknown'));
        break;
        
    case 'charge.refunded':
        handleRefund($event['data']['object']);
        break;
        
    default:
        error_log("Unhandled event type: " . $event['type']);
}

// Return success
http_response_code(200);
echo json_encode(['received' => true]);

/**
 * Handle successful checkout (with idempotency)
 */
function handleCheckoutComplete($session) {
    $userId = $session['client_reference_id'] ?? $session['metadata']['userId'] ?? null;
    $packKey = $session['metadata']['pack'] ?? null;
    $sessionId = $session['id'] ?? 'unknown';
    
    // IDEMPOTENCY CHECK - Prevent duplicate processing
    $processedFile = '/home/birdturds/private/processed_sessions.log';
    $processedSessions = file_exists($processedFile) ? file($processedFile, FILE_IGNORE_NEW_LINES) : [];
    
    if (in_array($sessionId, $processedSessions)) {
        error_log("Webhook already processed: $sessionId (idempotency check)");
        return; // Already processed, skip
    }
    
    // Mark as processed BEFORE doing work (prevents race conditions)
    file_put_contents($processedFile, $sessionId . "\n", FILE_APPEND | LOCK_EX);
    
    error_log("Processing checkout: session=$sessionId, user=$userId, pack=$packKey");
    
    if (!$packKey) {
        error_log("No pack specified in checkout session");
        return;
    }
    
    // Check if special pack (remove ads)
    if (isSpecialPack($packKey)) {
        // Mark ads as removed for user
        $purchaseData = [
            'sessionId' => $sessionId,
            'userId' => $userId,
            'pack' => $packKey,
            'type' => 'remove_ads',
            'amount' => $session['amount_total'] ?? 0,
            'timestamp' => date('c'),
            'status' => 'completed'
        ];
        logPurchaseToFirebase($purchaseData);
        error_log("Ads removed for user: $userId");
        return;
    }
    
    // Get coins for the pack
    $coinsToAdd = getCoinsForPack($packKey);
    
    if ($coinsToAdd <= 0) {
        error_log("Invalid pack or zero coins: $packKey");
        return;
    }
    
    // Credit coins to user
    if ($userId) {
        $newBalance = creditCoinsViaFirebase($userId, $coinsToAdd);
        error_log("Credited $coinsToAdd coins to user $userId. New balance: $newBalance");
    }
    
    // Log the purchase
    $purchaseData = [
        'sessionId' => $sessionId,
        'userId' => $userId,
        'pack' => $packKey,
        'coinsAdded' => $coinsToAdd,
        'amount' => $session['amount_total'] ?? 0,
        'currency' => $session['currency'] ?? 'usd',
        'customerEmail' => $session['customer_details']['email'] ?? null,
        'timestamp' => date('c'),
        'status' => 'completed'
    ];
    
    logPurchaseToFirebase($purchaseData);
    error_log("Purchase logged: " . json_encode($purchaseData));
}

/**
 * Handle refund
 */
function handleRefund($charge) {
    $chargeId = $charge['id'] ?? 'unknown';
    $amount = $charge['amount_refunded'] ?? 0;
    
    error_log("Refund processed: charge=$chargeId, amount=$amount");
    
    // Log refund to Firebase
    $refundData = [
        'chargeId' => $chargeId,
        'amountRefunded' => $amount,
        'timestamp' => date('c'),
        'status' => 'refunded'
    ];
    
    logPurchaseToFirebase($refundData);
}
