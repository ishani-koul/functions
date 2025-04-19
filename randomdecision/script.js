document.addEventListener('DOMContentLoaded', function () {
	var form = document.getElementById('dilemmaForm');
	var addOptionButton = document.getElementById('addOptionButton');
	var additionalOptionsContainer = document.getElementById('additionalOpt');
	var resultBox = document.getElementById('resultDisplay');

	// 2 options 
	var optionCount = 2;

	// Add Option +1 
	addOptionButton.addEventListener('click', function () {
		optionCount = optionCount + 1;

	// Create a new input box
		var newInput = document.createElement('input');
		newInput.type = 'text';
		newInput.placeholder = 'Option' + optionCount;
		newInput.className = 'option-input';
	
	// Add it to the form
		additionalOptionsContainer.appendChild(newInput);
	});

	// When the form is submitted -  No refresh 
	form.addEventListener('submit', function (event) {
		event.preventDefault();
	
	// Get the values from the first two input fields
	var option1 = document.getElementById('option1').value;
	var option2 = document.getElementById('option2').value;
	
	// Create a list of all options
	var options = [option1, option2];
	
	// Get any extra input fields that were added
	var extraInputs = document.querySelectorAll('.option-input');
	
	// Pass through each value and see what is a valid value
	for (var i = 0; i < extraInputs.length; i++) {
		var inputValue = extraInputs[i].value;
	
		// if Not empty 
		if (inputValue.trim() !== '') {
			options.push(inputValue);
		}
	}

		// If no options were added, show a message
		if (options.length === 0) {
			resultBox.textContent = 'Nothing to choose!';
		} else {
		// Pick one random option
		var randomIndex = Math.floor(Math.random() * options.length);
		var selectedOption = options[randomIndex];
		
		// Show the selected result
		resultBox.textContent = selectedOption;
		resultBox.classList.add('result-on');
		}
	});
});
