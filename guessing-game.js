var winningNum = generateNumber();
var numGuesses = 5;
var prevGuesses = [];

$(document).ready(function() {
	console.log("winning number: " + winningNum);

	$("#submit").click(function() {
		var message = guess($("#guess").val());
		$("#status").html(message);
		$("#guess").attr("value","");
	});

	$("#play_again").click(function() {
		playAgain();
	});

	$("#hint").click(function() {
		var hint = giveHint();
		$("#status").html(hint);
	});

});

function generateNumber() {
	return Math.round(Math.random()*100);
}

function guess(num) {
	if (numGuesses == 0) {
		return "You have no more guesses left. Please click Play Again.";
		$("#hint").attr("disabled","disabled");
	} else {
		numberGuessed = parseInt(num);
		if (isValid(numberGuessed) == "Valid") {
			var direction = '';
			var distance = ''
			if (isWinningNumber(numberGuessed)) {
				return "You are the winner!";
			} else if (numberGuessed > winningNum) {
				direction = "Your guess is too high"
			} else if (numberGuessed < winningNum) {
				direction = "Your guess is too low"
			}
			displayGIF();
			numGuesses--;
			prevGuesses.push(numberGuessed);
			$("#num_guesses > span").html(numGuesses);
			return "Try again. " + direction + distance;
		} else if (isValid(numberGuessed) == "Invalid") {
			return "Your guess is not valid. Please input a number between 1 & 100";
		} else if (isValid(numberGuessed) == "Duplicate") {
			return "You submitted a duplicate guess.";
		}
	}
}

function isWinningNumber(num) {
	if (numberGuessed == winningNum) {
		$("#hint").attr("disabled","disabled");
		$("#submit").attr("disabled","disabled");
		numGuesses--;
		displayGIF("winner");
		return true;
	} else {
		return false;
	}
}

function isValid(num) {
	if (num < 1 || num > 100) {
		return "Invalid";
	} else if (prevGuesses.indexOf(num) != -1) {
		return "Duplicate";
	} else {
		return "Valid";
	}
}

function playAgain() {
	numGuesses = 5;
	prevGuesses = [];
	winningNum = generateNumber();
	console.log("new winning number: " + winningNum);
	$("#status").html("");
	$("#hint").removeAttr("disabled");
	$("#submit").removeAttr("disabled");
	$("#num_guesses > span").html(numGuesses);
	$("#gif").html("");
}

function giveHint() {
	var hintArray = [];
	for(var i=1; i < (numGuesses*2); i++) {
		hintArray.push(generateNumber());
	}
	var index =Math.round(Math.random()*hintArray.length);
	hintArray.splice(index,0,winningNum);
	return "One of these is the winning number:<br />" + hintArray.join(", ");
}

function displayGIF(player_status) {
	var winnerGIFs = ['<iframe src="//giphy.com/embed/xbASkE3pEK7pC" width="480" height="274" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="//giphy.com/embed/l41lWcjB65zASTfGM" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="//giphy.com/embed/tswHdSIDNfAUE" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'];
	var loserGIFs = ['<iframe src="//giphy.com/embed/oIOVkU7Upb3wY" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="//giphy.com/embed/TlTxstYNiz0Yg" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="//giphy.com/embed/oRFWicT90ngbK" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="http://i.imgur.com/n0mcL51.gifv" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'];

	if(player_status == "winner") {
		var index = Math.round(Math.random()*winnerGIFs.length;
		$("#gif").html(winnerGIFs[index]);
	} else {
		var index = Math.round(Math.random()*loserGIFs.length;
		$("#gif").html(loserGIFs[index]);
	}
}