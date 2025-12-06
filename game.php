<?php
/**
 * BirdTurds Game - Protected JavaScript Delivery
 * Copyright (c) 2025 Laugh Time Studio. All Rights Reserved.
 * 
 * NOTICE: This code is protected intellectual property.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 * Violators will be subject to legal action under copyright law.
 */

// Prevent direct access detection
$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
$allowedDomains = ['birdturds.com', 'www.birdturds.com', 'localhost'];
$isAllowed = false;

foreach ($allowedDomains as $domain) {
    if (strpos($referer, $domain) !== false) {
        $isAllowed = true;
        break;
    }
}

// Allow if no referer (direct browser load) but add warning
header('Content-Type: application/javascript; charset=utf-8');
header('X-Content-Type-Options: nosniff');
// DISABLE CACHING FOR DEVELOPMENT
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Anti-hotlinking: if from unknown domain, serve decoy
if (!empty($referer) && !$isAllowed) {
    echo "console.error('BirdTurds: Unauthorized access detected. This game is property of Laugh Time Studio.');";
    exit;
}

// Add license header
echo "/*!\n";
echo " * BirdTurds Game Engine v15.0\n";
echo " * Copyright (c) 2025 Laugh Time Studio. All Rights Reserved.\n";
echo " * \n";
echo " * This code is protected intellectual property. Unauthorized copying,\n";
echo " * modification, reverse engineering, or distribution is strictly prohibited\n";
echo " * and may result in severe civil and criminal penalties.\n";
echo " * \n";
echo " * License: Proprietary - All Rights Reserved\n";
echo " * Website: https://birdturds.com\n";
echo " */\n\n";

// Serve the obfuscated game code
$gameFile = __DIR__ . '/js/game.min.js';
if (file_exists($gameFile)) {
    readfile($gameFile);
} else {
    // Fallback to regular file
    $fallback = __DIR__ . '/js/game.js';
    if (file_exists($fallback)) {
        readfile($fallback);
    } else {
        echo "console.error('Game file not found');";
    }
}
?>
