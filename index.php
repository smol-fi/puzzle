<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width-device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="style/style.css">
	<script defer src="script/script.js" type="text/javascript"></script>
	 <link rel="stylesheet" type="text/css" href="./style/w3.css"> 
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<?php include "includes/config.php";?>
	<title>JS/jQ Jigsaw Puzzle</title>
</head>
<body>
<div id="scorebar">
	<div id="movesBar" class="scorebar-items"></div>
	<div id="scoreCBar" class="scorebar-items"><p id="score"></p></div>
	<div id="highscoreBar" class="scorebar-items"></div>
	<div id="clearhigh"><button onclick="clearHighscore()" class="w3-button scorebar-button scorebar-items" id="clearbutton">Töm rekord</button></div>
	<button onclick="document.getElementById('scorearea').style.display='block'"
class="w3-button scorebar-button scorebar-items">Visa rekord</button>
<div id="scorearea" class="w3-modal">
  <div class="w3-modal-content">
    <div class="w3-container">
      <span onclick="document.getElementById('scorearea').style.display='none'"
      class="w3-button w3-display-topright">&times;</span>
<!--php
echo "<table id='scorelist' style='border: solid 1px black;'>";
echo "<tr><th style='border: 1px solid black;'>Rekord</th></tr><tr><th>ID</th><th>Namn</th><th>Drag</th></tr>";

$query = $con->prepare("SELECT * FROM highscore");
$query->execute();

$result = $query->setFetchMode(PDO::FETCH_ASSOC);

foreach($query->fetch() as $k) {
	echo $k;
}
$con = null;
echo "</table>";
-->
<?php
$query = $con->prepare("SELECT * FROM highscore WHERE Score BETWEEN 25 AND 9999 ORDER BY Score ASC LIMIT 5");
$query->execute();
echo "<h2>Rekord:</h2><table>";
while($row = $query->fetch()){
	echo "<tr><td width='100'>" . $row['Name'] . "</td>";
	echo "<td width='100'>" . $row['Score'] . "</td></tr>";
}
echo "</table>";
?>
    </div>
  </div>
</div>
</div>
<div id="gamewrapper">
<div id="playarea" class="game-container"></div>
<div id="jigsaw" class="game-container"></div>
</div>
</body>
</html>