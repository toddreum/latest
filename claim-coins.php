<?php
/**
 * BirdTurds Coin Claim Handler v40.6
 * Called after successful Stripe checkout to verify and return purchase info
 */

// Load secure configuration
$configPath = '/home/birdturds/private/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    die(json_encode(['ok' => false, 'error' => 'Server configuration error']));
}
require_once $configPath;

// Handle CORS
handlePreflight();
setCorsHeaders();

header('Content-Type: application/json');

// Get session ID from query string
$sessionId = $_GET['session_id'] ?? null;

if (!$sessionId) {
    http_response_code(400);
    die(json_encode(['ok' => false, 'error' => 'Session ID required']));
}

// Retrieve the session from Stripe
$stripeUrl = "https://api.stripe.com/v1/checkout/sessions/" . urlencode($sessionId);

$ch = curl_init($stripeUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, STRIPE_SECRET_KEY . ':');

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    error_log("Failed to retrieve Stripe session: $sessionId");
    http_response_code(400);
    die(json_encode(['ok' => false, 'error' => 'Invalid session']));
}

$session = json_decode($response, true);

// Check payment status
if ($session['payment_status'] !== 'paid') {
    die(json_encode(['ok' => false, 'error' => 'Payment not completed', 'status' => $session['payment_status']]));
}

// Get pack info from metadata
$packKey = $session['metadata']['pack'] ?? null;
$userId = $session['client_reference_id'] ?? $session['metadata']['userId'] ?? null;

if (!$packKey) {
    die(json_encode(['ok' => false, 'error' => 'No pack info in session']));
}

// Check if this is a special pack (remove ads)
if (isSpecialPack($packKey)) {
    echo json_encode([
        'ok' => true,
        'adsRemoved' => true,
        'message' => 'Ads have been removed!'
    ]);
    exit;
}

// Get coins for the pack
$coinsToAdd = getCoinsForPack($packKey);

if ($coinsToAdd <= 0) {
    die(json_encode(['ok' => false, 'error' => 'Invalid pack']));
}

// Return success with coin info
// Note: Actual coin crediting happens via webhook for security
// This endpoint just confirms the purchase to the client
echo json_encode([
    'ok' => true,
    'coinsAdded' => $coinsToAdd,
    'pack' => $packKey,
    'message' => "Successfully purchased $coinsToAdd TurdCoins!",
    'balance' => $coinsToAdd // Client will add this to their local balance
]);
