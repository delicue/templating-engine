<?php 

function base_dir($path): string {
    return __DIR__ . '/../' . $path;
}

function view($viewName, $data = []): string {
    return base_dir("src/views/{$viewName}.view.php");
}

function page_error($code): string {
    http_response_code($code);
    return base_dir("src/views/errors/{$code}.error.php");
}

function not_found(): never {
    http_response_code(404);
    require page_error('404');
    die(404);
}

function get_partial($partialName): string{
    return base_dir("src/views/partials/{$partialName}.partial.php");
}