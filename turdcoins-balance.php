<?php
// turdcoins-balance.php - Get current balance
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require __DIR__ . '/config.php';

$userId = bt_get_user_id();
$user = bt_get_user($userId);

// Give test IPs bonus coins
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$testIps = bt_get_test_ips();
if (in_array($ip, $testIps, true) && ($user['coins'] ?? 0) < 10000) {
    $user['coins'] = 10000;
    $user['dev'] = true;
    bt_save_user($userId, $user);
}

echo json_encode([
    'ok' => true,
    'balance' => (int)($user['coins'] ?? 0),
    'adFree' => !empty($user['adFree']),
    'userId' => $userId
]);
