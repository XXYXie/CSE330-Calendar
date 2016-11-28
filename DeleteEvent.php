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
  if (is_null($id)) {
        echo json_encode(array("success" => false));
        return;
  }

  $stmt = $mysqli->prepare("DELETE FROM events WHERE id=?");
  if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
  $stmt->bind_param('i', $id);
  $stmt->execute();
  $stmt->close();
  echo json_encode(array(
           "eventDeleted" => true
 ));
 exit;


?>
