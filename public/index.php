<?php
require '../app/functions.php';

$request = $_SERVER['REQUEST_URI'] ?? '/';


// Define routes
$routes = [
    '/' => view('index'),
    '/about' => view('about'),
    '/contact' => view('contact'),
];

if (array_key_exists($request, $routes)) { 
    require get_partial('header');
    // Load the requested view
    require $routes[$request];
    require get_partial('footer');
} else {
    not_found();
}