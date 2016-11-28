<?php
require 'Database.php';

header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
session_start();

if (isset($_SESSION['username'])) {
  $_SESSION['loggedin'] = true;
  $username = $mysqli->real_escape_string($_SESSION['username']);
}
else {
  $_SESSION['loggedin'] = false;
  header("Location: login.php");
  exit;
}

$token = $_POST['token'];
if ($token != $_SESSION['token']){
  die("Request forgery detected");
}
  $title = $mysqli->real_escape_string($_POST['title']);
  $year = $_POST['year'];
  $month = $_POST['month'] +1;
  $date = $_POST['date'];
  $hour = $_POST['hour'];
  $minute = $_POST['minute'];
  $category = $_POST['category'];

  // Insert into table events
  $stmt = $mysqli->prepare("INSERT INTO events (title, username, year, month, date, hour, minute, category) values (?, ?, ?, ?, ?, ?, ?, ?)");
  if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
  $stmt->bind_param('ssiiiiis', $title, $username, $year, $month, $date, $hour, $minute, $category);
  $stmt->execute();
  $id = $mysqli->insert_id;
  $stmt->close();

  echo json_encode(array(
           "eventAdded" => true,
           "id" => $id
 ));
 exit();


?>
