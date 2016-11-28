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

  $id = $_POST['id'];
  $title = $mysqli->real_escape_string($_POST['title']);
  $year = $_POST['year'];
  $month = $_POST['month'];
  $date = $_POST['date'];
  $hour = $_POST['hour'];
  $minute = $_POST['minute'];
  $category = $_POST['category'];

  $stmt = $mysqli->prepare("UPDATE events SET title=?, username=?, year=?, month=?, date=?, hour=?, minute=?, category=? WHERE id=?");
  if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
  $stmt->bind_param('ssiiiiisi', $title, $username, $year, $month, $date, $hour, $minute, $category, $id);
  $stmt->execute();
  $stmt->close();

  //echo "return test";
  echo json_encode(array(
    "success" => "true",
           "eventEdited" => "true",
           "id" => $id
 ));
 exit;

?>
