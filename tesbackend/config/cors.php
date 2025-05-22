<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */    'paths' => ['api/*', 'login', 'register', 'sanctum/csrf-cookie'],
    
    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000',   // Web version
        'http://localhost:8080',   // Common Flutter web debug
        'http://10.0.2.2:8080',    // Android emulator pointing to host
        'capacitor://localhost',   // Capacitor
        'ionic://localhost',       // Ionic
        'http://localhost',        // Basic localhost
    ],
    
    'allowed_origins_patterns' => [
        '/^http:\/\/192\.168\.\d+\.\d+:\d+$/',  // Local network IPs
        '/^http:\/\/172\.\d+\.\d+\.\d+:\d+$/',  // Docker network
        '/^http:\/\/10\.\d+\.\d+\.\d+:\d+$/',   // VPN/other local networks
        '/^file:\/\/\/.*/'                      // File protocol for mobile apps
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
