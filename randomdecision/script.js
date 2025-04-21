document.addEventListener('DOMContentLoaded', function () {
	var form = document.getElementById('dilemmaForm');
	var addOptionButton = document.getElementById('addOptionButton');
	var additionalOptionsContainer = document.getElementById('additionalOpt');
	var resultBox = document.getElementById('resultDisplay');

	var optionCount = 2;

	// Add new input field when user clicks "Add option"
	addOptionButton.addEventListener('click', function () {
		optionCount += 1;

		var newInput = document.createElement('input');
		newInput.type = 'text';
		newInput.placeholder = 'Enter option ' + optionCount;
		newInput.classList.add('option-input');
		newInput.required = true;

		additionalOptionsContainer.appendChild(newInput);
	});

	// Form submission handler
	form.addEventListener('submit', function (event) {
		event.preventDefault();

		resultBox.textContent = '';
		resultBox.classList.remove('result-on');

		var options = [];

		var option1 = document.getElementById('option1').value.trim();
		var option2 = document.getElementById('option2').value.trim();

		if (option1) options.push(option1);
		if (option2) options.push(option2);

		var extraInputs = document.querySelectorAll('.option-input');
		extraInputs.forEach(function (input) {
			var val = input.value.trim();
			if (val) options.push(val);
		});

		if (options.length === 0) {
			resultBox.textContent = 'Nothing to choose!';
			return;
		}

		// Blinking dots animation
		let dotCount = 0;
		resultBox.textContent = "The universe is thinking";
		const loadingInterval = setInterval(() => {
			dotCount = (dotCount + 1) % 4;
			resultBox.textContent = "The universe is thinking" + ".".repeat(dotCount);
		}, 500);

		// After delay, stop loading and show result
		setTimeout(() => {
			clearInterval(loadingInterval);

			var selected = options[Math.floor(Math.random() * options.length)];
			var fullSentence = `The universe has decided: ${selected}`;
			resultBox.textContent = fullSentence;
			resultBox.classList.add('result-on');
		}, 3000); // Adjust delay here (in ms)
	});
});
