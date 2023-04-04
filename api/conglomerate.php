<?php
header("Access-Control-Allow-Origin: *");
session_start();
echo json_encode(array(
    'United Neon Advertising Inc.',
    'United Transit Ads Systems Inc',
    'TAP ADS Media Corporation',
    'Media Display Solutions',
    'Onion Bulb Productions',
    'Plus Network',
    'Retailgate',
    'Innovation One',
    'Inspire Leadership Consultancy',
    'Seeworthy International',
    'Breakthrough Leadership Management'
));
?>