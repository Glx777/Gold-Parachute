<?php
  session_start();
  include 'config.php';
  if (isset($_POST['name'])) {
    $name = mysqli_real_escape_string($db, $_POST['name']);
    $score = mysqli_real_escape_string($db, $_POST['score']);
    $_SESSION['name'] = $name;
    $_SESSION['score'] = $score;
    $sql = "INSERT INTO Records (name, score)
    VALUES ('$name', '$score')";
    $result = $db->query($sql);
    if ($result) {
      echo 'added successfully';
    }
  }
?>
