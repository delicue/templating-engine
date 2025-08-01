<?php 

function base_dir($path): string {
    return __DIR__ . '/../' . $path;
}

function view($viewName, $data = []): string {
    return base_dir("src/views/{$viewName}.view.php");
}

function not_found(): never {
    http_response_code(404);
    require view('404');
    die();
}

function get_partial($partialName): string{
    return base_dir("src/views/partials/{$partialName}.partial.php");
}