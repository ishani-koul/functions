document.addEventListener('DOMContentLoaded', function () {
	// Get all elements from HTML
	var form = document.getElementById('dilemmaForm');
	var addOptionButton = document.getElementById('addOptionButton');
	var additionalOptionsContainer = document.getElementById('additionalOpt');
	var resultBox = document.getElementById('resultDisplay');

	const submitButton = document.getElementById('submitButton');
	const dilemmaInput = document.getElementById('dilemma');
	const option1Input = document.getElementById('option1');
	const option2Input = document.getElementById('option2');

	// Disable 'Decide for me' Button
	submitButton.disabled = true;

	// Check if all required fields have content
	// If they do -> Enable submit -> iF NOT, KEEP DISABLED
	function toggleSubmitState() {
		const hasDilemma = dilemmaInput.value.trim().length > 0;
		const hasOption1 = option1Input.value.trim().length > 0;
		const hasOption2 = option2Input.value.trim().length > 0;
		submitButton.disabled = !(hasDilemma && hasOption1 && hasOption2);
	}

	// Check for input 
	dilemmaInput.addEventListener("input", toggleSubmitState);
	option1Input.addEventListener("input", toggleSubmitState);
	option2Input.addEventListener("input", toggleSubmitState);
	toggleSubmitState();

	// Track how many options have been added so far
	var optionCount = 2;

	// Max limit for options for now -- see if you want to remove this tho
	const MAX_OPTIONS = 4;

	// Add option flow
	addOptionButton.addEventListener('click', function () {
		const currentInputs = document.querySelectorAll('.option-input').length + 2; // +2 for the base option1 and option2

		// If max options reached, show alert and disable the add button
		if (currentInputs >= MAX_OPTIONS) {
			alert("You've reached the maximum number of options.");
			addOptionButton.disabled = true;
			addOptionButton.style.opacity = "0.5";
			addOptionButton.style.cursor = "not-allowed";
			return;
		}

		// If not -> create new input and add it below the existing ones
		// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement reference source
		optionCount += 1;

		var newInput = document.createElement('input');
		newInput.type = 'text';
		newInput.placeholder = 'Enter option ' + optionCount;
		newInput.classList.add('option-input');
		newInput.required = true;

		additionalOptionsContainer.appendChild(newInput);

	});

	// Submit button click
	form.addEventListener('submit', function (event) {
		event.preventDefault(); // Stop the page from refreshing

		// Clear previous results
		resultBox.textContent = '';
		resultBox.classList.remove('result-on');

		// Create an array to store all the options entered
		var options = [];

		// Get the values of the first two inputs + Add to options array
		var option1 = document.getElementById('option1').value.trim();
		var option2 = document.getElementById('option2').value.trim();

		if (option1) options.push(option1);
		if (option2) options.push(option2);

		// Add values from additional options that were added
		var extraInputs = document.querySelectorAll('.option-input');
		extraInputs.forEach(function (input) {
			var val = input.value.trim();
			if (val) options.push(val);
		});

		// Not needed anymore - keeping it tho : can delete
		if (options.length === 0) {
			resultBox.textContent = 'Nothing to choose!';
			return;
		}

		// Loader animation for thinking...
		let dotCount = 0;
		resultBox.textContent = "The universe is thinking";
		const loadingInterval = setInterval(() => {
			dotCount = (dotCount + 1) % 4;
			resultBox.textContent = "The universe is thinking" + ".".repeat(dotCount);
		}, 500);

		// Random selection of option -> display
		setTimeout(() => {
			clearInterval(loadingInterval);

			var selected = options[Math.floor(Math.random() * options.length)];
			var fullSentence = `The universe has decided:<br><span class="highlighted-choice">${selected}</span>`;
			resultBox.innerHTML = fullSentence;
			resultBox.classList.add('result-on');
		}, 3000);
	});

	// reset reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
	// When the reset button is clicked, clear everything and reset the state
	const resetButton = document.getElementById('resetButton');

	resetButton.addEventListener('click', function () {
		// Remove any added input fields - keep 2
		additionalOptionsContainer.innerHTML = '';
		optionCount = 2;

		// Reset the message area
		resultBox.innerHTML = 'The universe will speak here';
		resultBox.classList.remove('result-on');

		// Disable the submit button again 
		submitButton.disabled = true;

		// Re-enable the add option button - check if it was disabled first
		addOptionButton.disabled = false;
		addOptionButton.style.opacity = "1";
		addOptionButton.style.cursor = "pointer";
	});
});
