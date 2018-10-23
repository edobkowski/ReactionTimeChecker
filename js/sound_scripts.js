 "use strict";

let songName;
let audioFile = null;
let audioLoaded = false;
let data = [];

document.body.onkeyup = function(e) {
	const ppButton = document.getElementById("pp-button");
	if(ppButton.className  === "playing") {
		const audioTime = audioFile.currentTime;
		const record = generateRecord(audioTime);
		data.push(record);
		console.log("Saved data: " + record);
		renderInfo("Key pressed on audio time: " + audioTime);
	}
}

window.onbeforeunload = function() {
	if(data.length > 0) {
		return "Do you want to leave the page without saving report?";
	}
}

function generateRecord(audioTime) {
	const fullTime = new Date();
	let hours = fullTime.getHours();
	if(hours < 10) {
		hours = "0" + hours;
	}
	let minutes = fullTime.getMinutes();
	if(minutes < 10) {
		minutes = "0" + minutes;
	}
	let seconds = fullTime.getSeconds();
	if(seconds < 10) {
		seconds = "0" + seconds;
	}
	let months = fullTime.getMonth() + 1;
	if(months < 10) {
		months = "0" + months;
	}
	let days = fullTime.getDate() + 1;
	if(days < 10) {
		days = "0" + days;
	}

	const date = fullTime.getFullYear() + "-" + months + "-" + days;
	const time = hours + ":" + minutes + ":" + seconds + "." + fullTime.getMilliseconds();
	const record = songName + "; " + audioTime + "; " + date + "; " + time;

	return record;
}

function init() {
    addListeners();
}

function addListeners() {
    document.getElementById("pp-button").addEventListener("click", playPause);
    document.getElementById("load-button").addEventListener("click", loadAudio);
    document.getElementById("save-button").addEventListener("click", save);
}

function save() {
	let filename = document.getElementById("test-id-input").value;
	if(filename === "") {
		const time = new Date();
		filename = "results_" + new Date().toLocaleString();
	} 
	filename += ".csv";
	let dataToSave = "SONG_TITLE; REACTION_TIME; MEASUREMENT_DATE; MEASUREMENT_TIME\n" + data.join("\n");
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

	renderInfo("Report downloaded: " + filename);
    data = [];
}

function renderWarning() {
	const infoSection = document.getElementById("info-section");
	infoSection.innerHTML = "<p class=\"message warning\">You have not specified audio file to play!</p>";
}

function renderInfo(message) {
	const infoSection = document.getElementById("info-section");
	infoSection.innerHTML = "<p class=\"message info\"> " + message + "</p>";
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
	const selectedSong = document.getElementById("audio-selector").value;
	const controllerButton = document.getElementById("pp-button");
	songName = selectedSong;
	if(controllerButton.className === "playing") {
		audioFile.pause();
		console.log("PAUSE");
		controllerButton.className = "pause";
		controllerButton.innerHTML = "<i class=\"fas fa-play\"></i>";
	}
	audioFile = new Audio();
	audioFile.src = "../resources/audio/" + selectedSong;
	console.log("Selected song: " + selectedSong);
	renderInfo("Set song: " + selectedSong);
	audioLoaded = true;
}