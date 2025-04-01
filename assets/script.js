document.getElementById('submitButton').addEventListener('click', function() {
	const option1 = document.getElementById('option1').value;
	const option2 = document.getElementById('option2').value;
	const option3 = document.getElementById('option3').value;

	// Collect options into an array
	const options = [option1, option2, option3];

	// Randomly select an option
	const randomIndex = Math.floor(Math.random() * options.length);
	const selectedOption = options[randomIndex];

	// Clear the previous result
	const resultElement = document.getElementById('result');
	resultElement.textContent = '';

	// Display the new result
	resultElement.textContent = `The universe has decided: ${selectedOption}`;
});
