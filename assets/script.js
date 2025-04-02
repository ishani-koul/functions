document.addEventListener('DOMContentLoaded', function () {
	// Getting key elemenst in HTML
	const dilemmaInput = document.getElementById('dilemma');
	const randomButton = document.getElementById('randomButton'); 
	const resultElement = document.getElementById('result'); 

	// An empty array to store the data fetched from the JSON file.
	let dilemmasData = [];

	// Fetch the dilemmas and their options from the JSON file located in the assets folder.
	fetch('assets/dilemmas.json')
		.then(response => response.json()) // Parse the JSON response
		.then(data => {
			dilemmasData = data; // Save the data into 'dilemmasData'
		});

	// Disable the random button - till it receives a selection
	randomButton.disabled = true;

	// See if things are being typed or selected in the dilemmaInput
	dilemmaInput.addEventListener('input', function () {
		// Get the value entered or selected in the dilemma field.
		const selectedDilemma = dilemmaInput.value;

		// Value matches any predefined dilemma from the JSON file
		const isPredefined = dilemmasData.some(d => d.dilemma === selectedDilemma); 

		// Enable the random button only if a predefined dilemma is selected
		randomButton.disabled = !isPredefined;
	});

	//Function for get random options
	randomButton.addEventListener('click', function () {

		// Get the current value of the dilemma input field.
		const selectedDilemma = dilemmaInput.value;

		// Look for a matching dilemma in the JSON file
		const matchingDilemma = dilemmasData.find(d => d.dilemma === selectedDilemma);
		if (matchingDilemma) {
			// If match is found - fill the options respectively
			document.getElementById('option1').value = matchingDilemma.options[0];
			document.getElementById('option2').value = matchingDilemma.options[1];
			document.getElementById('option3').value = matchingDilemma.options[2];

		} else {
			// If no match is found - show alert. (not sure if needed thouugh)
			alert('No matching options found for this dilemma!');
		}
	});


	// Let the universe decide - funcction
	document.getElementById('submitButton').addEventListener('click', function () {
		// Get the values of the three option input fields.
		const option1 = document.getElementById('option1').value;
		const option2 = document.getElementById('option2').value;
		const option3 = document.getElementById('option3').value;

		// Collect all non-empty options into a new array
		const options = [option1, option2, option3].filter(option => option.trim() !== '');

		// If no valid options are available, display an error message and stop.
		if (options.length === 0) {
			resultElement.textContent = 'The universe has no options!';
		return;
		}

		// Randomly select one of the available options.
		const randomIndex = Math.floor(Math.random() * options.length); 
		const selectedOption = options[randomIndex]; // Get the option at the random index - generated at randomIndex

		// Display the selected option with a fun message.
		resultElement.textContent = `The universe suggests ${selectedOption}!`;
	});

});
