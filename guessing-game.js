var winningNum = generateNumber();
var numGuesses = 0;
var prevGuesses = [];

$(document).ready(function() {
	console.log("winning number: " + winningNum);

	$("#submit").click(function() {
		var message = guess($("#guess").val());
		$("#status").html(message);
		$("#guess").attr("value","");
	});

});

function generateNumber() {
	return Math.round(Math.random()*100);
}

function guess(numberGuessed) {
	numGuess = parseInt(numberGuessed);
	if (isValid(numGuess) == "Valid") {
		var direction = '';
		var distance = ''
		if (guess == winningNum) {
			return "You are the winner!";
		} else if (guess > winningNum) {
			direction = "Your guess is too high"
		} else if (guess < winningNum) {
			direction = "Your guess is too low"
		}
		numGuesses++;
		prevGuesses.push(numGuess);
		$("#num_guesses > span").html(numGuesses);
		return "Try again. " + direction + distance;
	} else if (isValid(numGuess) == "Invalid") {
		return "Your guess is not valid. Please input a number between 1 & 100";
	} else if (isValid(numGuess) == "Duplicate") {
		return "You submitted a duplicate guess.";
	}
}

function isValid(num) {
	//return (num > 0 && num <= 100) ? true : false;
	if (num < 1 || num > 100) {
		return "Invalid";
	} else if (prevGuesses.indexOf(num) != -1) {
		return "Duplicate";
	} else {
		return "Valid";
	}
}