 "use strict";

let songName;
let audioFile = null;
let audioLoaded = false;
let data = [];

document.body.onkeyup = function(e) {
	console.log("Key code: " + e.keyCode);
	const ppButton = document.getElementById("pp-button");
	if(ppButton.className  === "playing") {
		const record = songName + "; " + audioFile.currentTime;
		data.push(record);
		console.log("Saved data: " + record);
	}
}

function init() {
    addListeners();
}

function save(filename) {
	let dataToSave = "SONG_TITLE; REACTION_TIME\n" + data.join("\n");
	let file = new Blob([dataToSave], {type: "text/plain;charset=utf-8"});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        const a = document.createElement("a");
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function renderWarning() {
	const infoSection = document.getElementById("info-section");
	infoSection.innerHTML = "<p class=\"message warning\">You have not specified audio file to play!</p>";
}

function renderInfo(selectedSong) {
	const infoSection = document.getElementById("info-section");
	infoSection.innerHTML = "<p class=\"message info\">Playing song: " + selectedSong + "</p>";
}

function playPause() {
	if(audioLoaded) {
		if(this.className === "playing") {
			audioFile.pause();
			console.log("PAUSE");
			this.className = "pause";
			this.innerHTML = "<i class=\"fas fa-play\"></i>";
		} else if(this.className === "pause") {
			audioFile.play();
			console.log("PLAY");
			this.className = "playing";
			this.innerHTML = "<i class=\"fas fa-pause\"></i>";
		}
	} else {
		console.log("Audio file not specified!");
		renderWarning();
	}	
}

function loadAudio() {
	audioFile = new Audio();
	const selectedSong = document.getElementById("audio-selector").value;
	if(selectedSong === "No man no cry") {
		console.log("Selected song: " + selectedSong);
		renderInfo(selectedSong);
		audioFile.src = "../resources/audio/no_man_no_cry.mp3";
	}

	songName = selectedSong;
	audioLoaded = true;
}

function addListeners() {
    document.getElementById("pp-button").addEventListener("click", playPause);
    document.getElementById("load-button").addEventListener("click", loadAudio);
}