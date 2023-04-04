<?php
header("Access-Control-Allow-Origin: *");
session_start();
$size = $_GET['size'];
$employee = array();
$maleEmployees = file_get_contents("https://names.drycodes.com/" . $size . "?nameOptions=boy_names&separator=space");
$femaleEmployees = file_get_contents("https://names.drycodes.com/" . $size . "?nameOptions=girl_names&separator=space");
$employeeTitles = file_get_contents("https://names.drycodes.com/" . ($size * 2) . "?nameOptions=starwarsTitles&separator=space");

foreach (json_decode($maleEmployees) as $emp) {
    $temp = array(
        "name" => $emp,
        "position" => ""
    );

    array_push($employee, $temp);
}
foreach (json_decode($femaleEmployees) as $emp) {
    $temp = array(
        "name" => $emp,
        "position" => ""
    );

    array_push($employee, $temp);
}

foreach (json_decode($employeeTitles) as $key => $title) {
    $employee[$key]['position'] = $title;
}

echo json_encode($employee);

?>