<?php
/**
 * BirdTurds Contact Form Handler v40.6
 * Receives contact form submissions and sends email
 */

// Load secure configuration
$configPath = '/home/birdturds/private/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    die(json_encode(['success' => false, 'error' => 'Server configuration error']));
}
require_once $configPath;

// Handle CORS
handlePreflight();
setCorsHeaders();

header('Content-Type: application/json');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Method not allowed']));
}

// Simple rate limiting via session
session_start();
$rateLimitKey = 'contact_form_last';
$minInterval = 60; // 1 minute between submissions

if (isset($_SESSION[$rateLimitKey]) && (time() - $_SESSION[$rateLimitKey]) < $minInterval) {
    http_response_code(429);
    die(json_encode(['success' => false, 'error' => 'Please wait before sending another message']));
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? 'Contact Form Submission');
$message = trim($input['message'] ?? '');

// Validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Name is required (min 2 characters)';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}
if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Message is required (min 10 characters)';
}
if (strlen($message) > 5000) {
    $errors[] = 'Message too long (max 5000 characters)';
}

// Basic spam check
$spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'crypto', 'bitcoin'];
$lowerMessage = strtolower($message);
foreach ($spamKeywords as $spam) {
    if (strpos($lowerMessage, $spam) !== false) {
        $errors[] = 'Message contains prohibited content';
        break;
    }
}

if (!empty($errors)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'errors' => $errors]));
}

// Sanitize
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Build email
$to = ADMIN_EMAIL;
$emailSubject = "[BirdTurds Contact] $subject";

$emailBody = "
New contact form submission from BirdTurds.com
================================================

Name: $name
Email: $email
Subject: $subject

Message:
---------
$message

---------
Sent: " . date('Y-m-d H:i:s') . "
IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "
User Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown') . "
";

$headers = [
    'From: noreply@birdturds.com',
    'Reply-To: ' . $email,
    'X-Mailer: BirdTurds Contact Form',
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
$sent = mail($to, $emailSubject, $emailBody, implode("\r\n", $headers));

if ($sent) {
    $_SESSION[$rateLimitKey] = time();
    
    // Log to file as backup
    $logFile = '/home/birdturds/private/contact_log.txt';
    $logEntry = date('Y-m-d H:i:s') . " | $name | $email | $subject\n";
    @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent. We\'ll get back to you soon!'
    ]);
} else {
    error_log("Failed to send contact email from: $email");
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to send message. Please try again or email us directly at ' . ADMIN_EMAIL
    ]);
}
