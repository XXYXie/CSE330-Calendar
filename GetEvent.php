<?php
require 'Database.php';
//header("Content-Type: application/json");

ini_set("session.cookie_httponly", 1);
session_start();

if (isset($_SESSION['username'])) {
  $username = $mysqli->real_escape_string($_SESSION['username']);
}
else {
  exit;
}

$token = $_POST['token'];
if ($token != $_SESSION['token']){
  die("Request forgery detected");
}

  $year = $_POST['year'];
  $month = $_POST['month'] + 1;
  $events = array();
  $stmt = $mysqli->prepare("SELECT id, title, date, hour, minute, category FROM events where username=? AND year=? AND month=?");
  if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
  $stmt->bind_param('sii', $username, $year, $month);
  $stmt->execute();
  $stmt->bind_result($id, $title, $date, $hour, $minute, $category);
  $title = htmlentities($title);

  while ($stmt->fetch()) {
        $event = array("id" => $id, "title" => $title, "date" => $date, "hour" => $hour, "minute" => $minute, "category"=> $category, "month" => $month, "year" => $year);
        array_push($events, $event);
    }
    $stmt->close();
    echo json_encode($events);

?>
