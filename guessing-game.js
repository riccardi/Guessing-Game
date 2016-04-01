$(document).ready(function() {
	console.log("here");
	var winningNum = generateNumber();
	var numGuesses = 0;

	$("#submit").click(function() {
		console.log("clicked");
		alert($("#submit").val());
	});

});

function generateNumber () {
	console.log("in generateNumber");
	return Math.round(Math.random()*100);
}

function guess() {
	var guess = parseInt($("#submit").val());
	if validateGuess(guess) {
		var direction = '';
		var distance = ''
		if (guess == winningNum) {
			return "You are the winner!";
		} else if (guess > winningNum) {
			
		} else if (guess < winningNum) {
			return "Your guess is too low"
			//$("#status").html("Your guess is too low");
		}
		numGuesses++;
		$("#num_guesses > span").html(numGuesses);
	} else {
		return "Your guess is not valid. Please input a number between 1 & 100";
	}
}

function validateGuess(num) {
	return (num > 0 && <= 100) ? true : false;

}