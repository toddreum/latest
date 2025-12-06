<?php
/**
 * BirdTurds ElevenLabs Voice Proxy v40.6
 * Proxies text-to-speech requests to ElevenLabs API
 * Keeps API key secure on server
 */

// Load secure configuration
$configPath = '/home/birdturds/private/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    die(json_encode(['error' => 'Server configuration error']));
}
require_once $configPath;

// Handle CORS
handlePreflight();
setCorsHeaders();

// Rate limiting (simple implementation)
session_start();
$rateLimitKey = 'elevenlabs_requests';
$maxRequestsPerMinute = 10;

if (!isset($_SESSION[$rateLimitKey])) {
    $_SESSION[$rateLimitKey] = ['count' => 0, 'reset' => time() + 60];
}

if (time() > $_SESSION[$rateLimitKey]['reset']) {
    $_SESSION[$rateLimitKey] = ['count' => 0, 'reset' => time() + 60];
}

if ($_SESSION[$rateLimitKey]['count'] >= $maxRequestsPerMinute) {
    http_response_code(429);
    die(json_encode(['error' => 'Rate limit exceeded. Try again in a minute.']));
}

$_SESSION[$rateLimitKey]['count']++;

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['error' => 'Method not allowed']));
}

// Get request body
$input = json_decode(file_get_contents('php://input'), true);

$text = $input['text'] ?? null;
$voiceId = $input['voiceId'] ?? 'EXAVITQu4vr4xnSDxMaL'; // Default voice (Sarah)
$modelId = $input['modelId'] ?? 'eleven_monolingual_v1';

if (!$text) {
    http_response_code(400);
    die(json_encode(['error' => 'Text is required']));
}

// Limit text length
if (strlen($text) > 500) {
    http_response_code(400);
    die(json_encode(['error' => 'Text too long (max 500 characters)']));
}

// Character voice mappings for BirdTurds hunters
$characterVoices = [
    'buck' => 'VR6AewLTigWG4xSOukaG', // Arnold - deep male
    'daisy' => 'EXAVITQu4vr4xnSDxMaL', // Sarah - female
    'bubba' => 'ODq5zmih8GrVes37Dizd', // Patrick - deep male
    'clyde' => 'VR6AewLTigWG4xSOukaG', // Arnold - gruff
    'sierra' => 'jBpfuIE2acCO8z3wKNLl', // Gigi - female
    'gunner' => 'N2lVS1w4EtoT3dr4eOWO', // Callum - military
    'jolene' => 'XB0fDUnXU5powFXDhCwa', // Charlotte - female
    'tammy' => 'jsCqWAovK2LkecY7zXl4', // Freya - young female
];

// Use character-specific voice if provided
$characterId = $input['characterId'] ?? null;
if ($characterId && isset($characterVoices[$characterId])) {
    $voiceId = $characterVoices[$characterId];
}

// Build ElevenLabs API request
$apiUrl = "https://api.elevenlabs.io/v1/text-to-speech/{$voiceId}";

$requestBody = json_encode([
    'text' => $text,
    'model_id' => $modelId,
    'voice_settings' => [
        'stability' => 0.5,
        'similarity_boost' => 0.75,
        'style' => 0.0,
        'use_speaker_boost' => true
    ]
]);

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: audio/mpeg',
    'Content-Type: application/json',
    'xi-api-key: ' . ELEVENLABS_API_KEY
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

if ($httpCode !== 200) {
    error_log("ElevenLabs API error: $httpCode");
    http_response_code($httpCode);
    die(json_encode(['error' => 'Voice generation failed']));
}

// Return audio as base64
if (strpos($contentType, 'audio') !== false) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'audio' => base64_encode($response),
        'format' => 'mp3'
    ]);
} else {
    // Return raw response if not audio (might be error)
    header('Content-Type: application/json');
    echo $response;
}
