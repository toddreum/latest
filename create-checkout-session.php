<?php
/**
 * BirdTurds - Stripe Checkout Session Creator
 * Uses existing config from /home/birdturds/private/config.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

// Load existing secure config
$configPath = '/home/birdturds/private/config.php';
if (file_exists($configPath)) {
    require_once $configPath;
} else {
    // Fallback to local config
    $localConfig = __DIR__ . '/private_config.php';
    if (file_exists($localConfig)) {
        require_once $localConfig;
    } else {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Server configuration error']);
        exit;
    }
}

// Handle preflight
handlePreflight();

// Set CORS headers
setCorsHeaders();
header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Get request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON input']);
    exit;
}

// Validate pack parameter
$packId = isset($data['pack']) ? $data['pack'] : '';
$userId = isset($data['userId']) ? $data['userId'] : 'guest';

// Use existing $COIN_PACKS from config.php
global $COIN_PACKS;

if (!isset($COIN_PACKS[$packId])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid pack selected', 'available' => array_keys($COIN_PACKS)]);
    exit;
}

$pack = $COIN_PACKS[$packId];
$packName = ucfirst($packId) . ' Pack';
$coins = $pack['coins'];
$priceInCents = $pack['price'];

// Try to load Stripe library
$stripeLoaded = false;

// Try Composer autoload first
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
    $stripeLoaded = true;
} elseif (file_exists('/home/birdturds/vendor/autoload.php')) {
    require_once '/home/birdturds/vendor/autoload.php';
    $stripeLoaded = true;
} elseif (file_exists(__DIR__ . '/stripe-php/init.php')) {
    require_once __DIR__ . '/stripe-php/init.php';
    $stripeLoaded = true;
}

if (!$stripeLoaded) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Stripe library not found']);
    exit;
}

try {
    \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);
    
    // Build product description
    $description = $coins > 0 ? "{$coins} TurdCoins for BirdTurds game" : "Special item: " . ($pack['special'] ?? 'unknown');
    
    // Create checkout session
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                    'name' => $packName,
                    'description' => $description,
                    'images' => ['https://birdturds.com/logo.png']
                ],
                'unit_amount' => $priceInCents,
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => SITE_URL . '/purchase-success.html?session_id={CHECKOUT_SESSION_ID}&pack=' . $packId . '&coins=' . $coins,
        'cancel_url' => SITE_URL . '/play.html?purchase=cancelled',
        'metadata' => [
            'pack_id' => $packId,
            'coins' => $coins,
            'user_id' => $userId,
            'special' => $pack['special'] ?? ''
        ]
    ]);
    
    // Return session info
    echo json_encode([
        'ok' => true,
        'sessionId' => $session->id,
        'url' => $session->url
    ]);
    
} catch (\Stripe\Exception\ApiErrorException $e) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Stripe error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}
?>
