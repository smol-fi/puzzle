var moves = 0;
var score = 0;


if(!localStorage.getItem("highscore")){
	localStorage.setItem("highscore", 0);
}

if(!localStorage.getItem("highestscorer")){
	localStorage.setItem("highestscorer", "Inget rekord");
}

var highScore = localStorage.getItem("highscore");
var hsHolder = localStorage.getItem("highestscorer");

document.getElementById("highscoreBar").innerHTML = "<p id=\"highscore\">"+hsHolder+": "+highScore+"</p>";

document.getElementById("movesBar").innerHTML = "<p id=\"moves\">Drag: "+moves+"</p>";

document.getElementById("scoreCBar").innerHTML = "<p id=\"score\">Poäng: "+score+"</p>";

for(i=1; i<=25; i++){
	$("#playarea").append("<div id='slot"+i+"'\' class=\'game-piece\' ondrop='drop(event)' ondragover='allowDrop(event)'></div>");
	
	$("#jigsaw").append("<div class='bitar' ondrop='drop(event)' ondragover='allowDrop(event)'><img id='img"+i+"' class='puzzle-piece' target-div='slot"+i+"'src='./img/"+i+".jpeg' draggable='true' ondragstart='drag(event)'></div>");
}

 function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {

	//Om diven redan innehåller en bild kan man inte flytta en annan utanpå.
	if(ev.target.tagName == "DIV"){
	//Lägg till en move per lyckat drag
	moves++;
	document.getElementById("movesBar").innerHTML = "<p id=\"moves\">Drag: "+moves+"</p>";	
    ev.preventDefault();
	//evImg=bilden som vi flyttar på
    var evImg = document.getElementById(ev.dataTransfer.getData("text"));
    ev.target.appendChild(evImg);
		//Kolla om biten far på rätt plats, om så, hindra framtida flytt och ta bort opacity.
		if(ev.target.id == evImg.getAttribute('target-div')){
			score++;
			document.getElementById("scoreCBar").innerHTML = "<p id=\"score\">Poäng: "+score+"</p>";
			evImg.setAttribute("draggable", false);
			evImg.setAttribute("ondragstart", false);
			ev.target.setAttribute("ondragover", false);
			ev.target.setAttribute("ondrop", false);
			ev.target.setAttribute("allowdrop", false);			
			evImg.style.opacity = "1";
			
			//Är alla bitar på rätt plats?
			if(score==25) {
				alert("Gratis jetemyket !! !");
				
				if(moves < highScore || highScore == 0){
					localStorage.setItem("highscore", moves)
					hsHolder = prompt("Grattis! Vad heter du?");
					localStorage.setItem("highestscorer", hsHolder);
				}
				
				if(confirm("Men du kan väl göra bättre?")){
					location.reload();
				}
			}
		}
	}
	
	else {
		alert("Mene nukkumaan.");
	}
	
}

function allowDrop(ev) {
    ev.preventDefault();
}

function clearHighscore(clear) {
	localStorage.setItem("highscore", 0);
	localStorage.setItem("highestscorer", "Inget rekord");
	highScore = localStorage.getItem("highscore");
	hsHolder = localStorage.getItem("highestscorer");	
	document.getElementById("highscoreBar").innerHTML = "<p id=\"highscore\">"+hsHolder+": "+highScore+"</p>";
	
}

 $(function () {
    var parent = $("#jigsaw");
    var pieces = parent.children();
    while (pieces.length) {
        parent.append(pieces.splice(Math.floor(Math.random() * pieces.length), 1)[0]);
    }
});