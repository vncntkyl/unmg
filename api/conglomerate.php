<?php
header("Access-Control-Allow-Origin: *");
session_start();
$companies = array(
    array("id" => 0, "name" => 'United Neon Advertising Inc.'),
    array("id" => 1, "name" => 'United Transit Ads Systems Inc'),
    array("id" => 2, "name" => 'TAP ADS Media Corporation'),
    array("id" => 3, "name" => 'Media Display Solutions'),
    array("id" => 4, "name" => 'Onion Bulb Productions'),
    array("id" => 5, "name" => 'Plus Network'),
    array("id" => 6, "name" => 'Retailgate'),
    array("id" => 7, "name" => 'Innovation One'),
    array("id" => 8, "name" => 'Inspire Leadership Consultancy'),
    array("id" => 9, "name" => 'Seeworthy International'),
    array("id" => 10, "name" => 'Breakthrough Leadership Management')
);

echo json_encode($companies, JSON_UNESCAPED_UNICODE);
?>