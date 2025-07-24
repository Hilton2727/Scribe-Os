<?php
session_start();

$HTDOCS_DIR = realpath($_SERVER['DOCUMENT_ROOT']);
if (!$HTDOCS_DIR) {
    die('Could not determine web root directory. Please check your server configuration.');
}
if (!isset($_SESSION['cwd']) || !is_dir($_SESSION['cwd'])) {
    $_SESSION['cwd'] = $HTDOCS_DIR;
}

$isApi = (
    (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest')
    || (isset($_GET['api']) && $_GET['api'] === '1')
);

if (!isset($_SESSION['history'])) {
    $_SESSION['history'] = [];
}

function sanitizePath($path) {
    global $HTDOCS_DIR;
    $full = realpath($_SESSION['cwd'] . '/' . $path);
    return ($full && str_starts_with($full, $HTDOCS_DIR)) ? $full : false;
}

function buildPath($path) {
    return $_SESSION['cwd'] . '/' . $path;
}

function getPrompt() {
    global $HTDOCS_DIR;
    $cwd = $_SESSION['cwd'];
    $rel = ltrim(str_replace($HTDOCS_DIR, '', $cwd), DIRECTORY_SEPARATOR);
    return 'htdocs' . ($rel ? DIRECTORY_SEPARATOR . $rel : '');
}

function runCommand($input) {
    global $HTDOCS_DIR;
    $input = trim($input);
    if ($input === '') return '';
    $_SESSION['history'][] = $input;
    $parts = preg_split('/\s+/', $input);
    $cmd = strtolower(array_shift($parts));
    $args = implode(' ', $parts);
    $output = "";

    switch ($cmd) {
        case 'ls':
            if (!$_SESSION['cwd'] || !is_dir($_SESSION['cwd'])) {
                $output = "Current directory is invalid.";
                break;
            }
            $files = scandir($_SESSION['cwd']);
            foreach ($files as $f) {
                if ($f === '.' || $f === '..') continue;
                $output .= $f . "\n";
            }
            break;
        case 'cd':
            $target = sanitizePath($args);
            if ($target && is_dir($target)) {
                $_SESSION['cwd'] = $target;
            } else {
                $output = "Directory not found.";
            }
            break;
        case 'cat':
            $file = sanitizePath($args);
            if ($file && is_file($file)) {
                $output = file_get_contents($file);
            } else {
                $output = "File not found.";
            }
            break;
        case 'rm':
            $target = sanitizePath($args);
            if ($target && file_exists($target)) {
                if (is_dir($target)) {
                    rmdir($target);
                } else {
                    unlink($target);
                }
                $output = "Deleted successfully.";
            } else {
                $output = "File or folder not found.";
            }
            break;
        case 'touch':
            $file = buildPath($args);
            if (!file_exists($file)) {
                file_put_contents($file, '');
                $output = "File created.";
            } else {
                $output = "File already exists.";
            }
            break;
        case 'mkdir':
            $dir = buildPath($args);
            if (!file_exists($dir)) {
                mkdir($dir);
                $output = "Folder created.";
            } else {
                $output = "Folder already exists.";
            }
            break;
        case 'rename':
            $parts = preg_split('/\s+/', $args);
            if (count($parts) === 2) {
                $from = sanitizePath($parts[0]);
                $to = buildPath($parts[1]);
                if ($from && file_exists($from)) {
                    rename($from, $to);
                    $output = "Renamed successfully.";
                } else {
                    $output = "Source not found.";
                }
            } else {
                $output = "Usage: rename <old> <new>";
            }
            break;
        case 'clear':
        case 'cls':
            return "<<<CLEAR>>>";
        case 'edit':
            $editFile = sanitizePath($args);
            if (!$editFile || !is_file($editFile)) {
                return "File not found or invalid path.";
            }
            $_SESSION['edit_file'] = $editFile;
            return "<<<EDIT>>>";
        case 'history':
            $output = implode("\n", $_SESSION['history']);
            break;
        case 'pwd':
            $cwd = $_SESSION['cwd'];
            $rel = ltrim(str_replace($HTDOCS_DIR, '', $cwd), DIRECTORY_SEPARATOR);
            $output = 'htdocs' . ($rel ? DIRECTORY_SEPARATOR . $rel : '');
            break;
        case 'help':
            $output = <<<EOT
Available commands:
  ls                    List files
  cd <dir>              Change directory
  cat <file>            View file content
  rm <file/folder>      Delete file/folder
  touch <file>          Create new file
  mkdir <folder>        Create new folder
  rename <old> <new>    Rename file or folder
  edit <file>           Edit file content
  clear/cls             Clear screen
  history               Show command history
  pwd                   Show current directory
  help                  Show this help
  exit                  End session
EOT;
            break;
        case 'exit':
            session_destroy();
            exit("Session ended.");
        default:
            $output = "Unknown command. Type 'help' to see commands.";
    }

    return $output;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['cmd'])) {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/plain; charset=utf-8');
    $inputCmd = $_POST['cmd'];
    $result = runCommand($inputCmd);
    if ($result === "<<<EDIT>>>") {
        echo "EDIT MODE NOT SUPPORTED";
    } elseif ($result === "<<<CLEAR>>>") {
        echo "<<<CLEAR>>>";
    } else {
        echo $result;
    }
    exit;
}
