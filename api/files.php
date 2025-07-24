<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

session_start();

// Use the web root for both local and live servers
$HTDOCS_DIR = realpath($_SERVER['DOCUMENT_ROOT']);
if (!$HTDOCS_DIR) {
    // Fallback for local XAMPP
    $HTDOCS_DIR = realpath('C:/xampp/htdocs');
}
if (!$HTDOCS_DIR) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not determine web root directory.']);
    exit;
}

$dir = isset($_GET['dir']) ? $_GET['dir'] : '';
$targetDir = realpath($HTDOCS_DIR . '/' . $dir);
if (!$targetDir || !str_starts_with($targetDir, $HTDOCS_DIR)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid directory.']);
    exit;
}

$files = scandir($targetDir);
$result = [];
foreach ($files as $file) {
    if ($file === '.' || $file === '..') continue;
    $fullPath = $targetDir . DIRECTORY_SEPARATOR . $file;
    $isDir = is_dir($fullPath);
    $result[] = [
        'name' => $file,
        'type' => $isDir ? 'folder' : 'file',
        'size' => $isDir ? '-' : filesize($fullPath),
        'modified' => date('Y-m-d H:i:s', filemtime($fullPath)),
    ];
}
echo json_encode($result); 