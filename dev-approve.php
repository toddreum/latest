<?php
// dev-approve.php - Dev team access system
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require __DIR__ . '/config.php';

// CHANGE THIS SECRET TOKEN - Keep it private!
$MASTER_DEV_TOKEN = 'BIRDTURDS_DEV_2024_SECRET';

$token = $_GET['token'] ?? '';

if ($token !== $MASTER_DEV_TOKEN) {
    echo json_encode(['approved' => false, 'error' => 'Invalid token']);
    exit;
}

// Activate dev mode for this user
$userId = bt_get_user_id();
$user = bt_get_user($userId);

$user['dev'] = true;
$user['coins'] = max($user['coins'] ?? 0, 999999);
$user['adFree'] = true;
$user['dev_activated'] = time();

bt_save_user($userId, $user);

echo json_encode([
    'approved' => true,
    'coins' => $user['coins'],
    'message' => 'Dev mode activated!'
]);
