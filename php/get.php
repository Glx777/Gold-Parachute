<?php
  include 'add.php';
  $datas = array();
  $id = null;
  $index = null;
  $s = 0;
  $sql = $db->query("SELECT * FROM Records ORDER BY score DESC, name");
  if ($sql->num_rows > 0) {
    while ($row = $sql->fetch_assoc()) {
      $datas[] = $row;
    }
  }
  $sliced = array_slice($datas, 0, 10);
  foreach ($datas as $key => $arr) {
    if ($arr['name'] == $_SESSION['name'] && $arr['score'] == $_SESSION['score']) {
      $id = $arr['id'];
      break;
    }
  }
  foreach ($datas as $key => $arr) {
    if ($arr['id'] = $id && $arr['name'] == $_SESSION['name'] && $arr['score'] == $_SESSION['score']) {
      $index = $key;
      break;
    }
  }
  if (sizeof($sliced) >= 10 && $_SESSION['score'] < $sliced[9]['score']) {
    for ($i = 0; $i < sizeof($sliced) - 1; $i++) {
      $s += 1;
      echo '<tr><td>' . $s . '</td><td>' . $sliced[$i]['name'] . '</td><td>' . $sliced[$i]['score'] . '</td></tr>';
    }
    echo '<tr><td class="special">' . $index . '</td><td class="special">' . $_SESSION['name'] . '</td><td class="special">' . $_SESSION['score'] . '</td></tr>';
  } else {
    for ($i = 0; $i < sizeof($sliced); $i++) {
      $s += 1;
      echo '<tr><td>' . $s . '</td><td>' . $sliced[$i]['name'] . '</td><td>' . $sliced[$i]['score'] . '</td></tr>';
    }
  }
?>
