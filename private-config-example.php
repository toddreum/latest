<?php
/**
 * BirdTurds Configuration File
 * 
 * INSTRUCTIONS:
 * 1. Copy this file to: /home/birdturds/private/config.php
 * 2. Fill in your actual Stripe keys
 * 3. The private folder should be OUTSIDE public_html for security
 * 
 * Your server structure should be:
 *   /home/birdturds/
 *     ├── private/
 *     │   └── config.php  <-- THIS FILE GOES HERE
 *     └── public_html/
 *         └── (all your website files)
 */

// ============ SITE CONFIG ============
define('SITE_URL', 'https://birdturds.com');

// ============ STRIPE API KEYS ============
// Get these from: https://dashboard.stripe.com/apikeys

// Publishable key (starts with pk_live_ or pk_test_)
// This is safe to expose to the frontend
define('STRIPE_PUBLISHABLE_KEY', 'pk_live_YOUR_PUBLISHABLE_KEY_HERE');

// Secret key (starts with sk_live_ or sk_test_)
// NEVER expose this to the frontend!
define('STRIPE_SECRET_KEY', 'sk_live_YOUR_SECRET_KEY_HERE');

// Webhook secret (for verifying Stripe webhooks)
define('STRIPE_WEBHOOK_SECRET', 'whsec_YOUR_WEBHOOK_SECRET_HERE');

// ============ COIN PACKS ============
// These are the purchasable TurdCoin packs
$COIN_PACKS = [
    'starter' => ['coins' => 1000, 'price' => 99, 'name' => 'Starter Pack'],
    'bucket' => ['coins' => 5000, 'price' => 499, 'name' => 'Bucket'],
    'megaload' => ['coins' => 12000, 'price' => 999, 'name' => 'Mega Load'],
    'monsterload' => ['coins' => 25000, 'price' => 1999, 'name' => 'Monster Load'],
    'whaleturd' => ['coins' => 60000, 'price' => 4999, 'name' => 'Whale Turd'],
    'kingturd' => ['coins' => 150000, 'price' => 9999, 'name' => 'King Turd Ultra'],
    'removeads' => ['coins' => 0, 'price' => 299, 'name' => 'Remove Ads', 'special' => 'Removes all ads forever!']
];

// ============ HELPER FUNCTIONS ============
function handlePreflight() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        http_response_code(200);
        exit;
    }
}

function setCorsHeaders() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

?>
