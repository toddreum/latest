<?php
/**
 * BIRDTURDS v43 - FIX38 Stripe Checkout Session Creator
 * Server-side checkout - works even when Stripe.js is blocked by adblockers
 * 
 * SETUP:
 * 1. composer require stripe/stripe-php
 * 2. Set STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY environment variables
 *    OR edit the config section below
 */

// ============================================================
// CONFIGURATION - Edit these if not using environment variables
// ============================================================
$stripeSecretKey = getenv('STRIPE_SECRET_KEY') ?: 'sk_test_YOUR_SECRET_KEY_HERE';
$stripePublishableKey = getenv('STRIPE_PUBLISHABLE_KEY') ?: 'pk_test_YOUR_PUBLISHABLE_KEY_HERE';
$publicUrl = getenv('PUBLIC_URL') ?: 'https://birdturds.com';

// ============================================================
// CORS HEADERS
// ============================================================
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only POST allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ============================================================
// LOAD STRIPE SDK
// ============================================================
$autoloadPaths = [
    __DIR__ . '/vendor/autoload.php',
    __DIR__ . '/../vendor/autoload.php',
    dirname(__DIR__) . '/vendor/autoload.php',
];

$loaded = false;
foreach ($autoloadPaths as $path) {
    if (file_exists($path)) {
        require_once $path;
        $loaded = true;
        break;
    }
}

if (!$loaded || !class_exists('\Stripe\Stripe')) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Stripe SDK not installed',
        'message' => 'Run: composer require stripe/stripe-php'
    ]);
    exit;
}

// ============================================================
// PARSE REQUEST
// ============================================================
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['priceId'])) {
    http_response_code(400);
    echo json_encode(['error' => 'priceId is required']);
    exit;
}

$priceId = trim($input['priceId']);

// Validate price ID format (Stripe price IDs start with price_)
if (!preg_match('/^price_[a-zA-Z0-9]+$/', $priceId)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid priceId format']);
    exit;
}

// ============================================================
// CREATE CHECKOUT SESSION
// ============================================================
try {
    \Stripe\Stripe::setApiKey($stripeSecretKey);
    
    $session = \Stripe\Checkout\Session::create([
        'line_items' => [[
            'price' => $priceId,
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => $publicUrl . '/play.html?purchase=success&session_id={CHECKOUT_SESSION_ID}',
        'cancel_url' => $publicUrl . '/play.html?purchase=canceled',
        'automatic_tax' => ['enabled' => false],
    ]);
    
    // Return checkout URL (client redirects directly) + session details (fallback)
    echo json_encode([
        'checkoutUrl' => $session->url,
        'url' => $session->url,
        'sessionId' => $session->id,
        'publishableKey' => $stripePublishableKey,
    ]);
    
} catch (\Stripe\Exception\InvalidRequestException $e) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Invalid request',
        'message' => $e->getMessage()
    ]);
    
} catch (\Stripe\Exception\AuthenticationException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Stripe authentication failed',
        'message' => 'Check your API keys'
    ]);
    
} catch (\Exception $e) {
    error_log('Stripe checkout error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error',
        'message' => 'Unable to create checkout session'
    ]);
}
