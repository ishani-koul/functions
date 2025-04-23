// Parts of the code were learnt from - https://codepen.io/hisivasankar/pen/yWZbPJ 
// Get elements from the page
const coin = document.getElementById("coin");
const flipButton = document.getElementById("flipButton");
const side1 = document.getElementById("side1");
const side2 = document.getElementById("side2");
const flipSound = document.getElementById("flipSound");

// Disable the button initially
flipButton.disabled = true;

// Either input filled - check
document.getElementById("option1").addEventListener("input", checkInputs);
document.getElementById("option2").addEventListener("input", checkInputs);

function checkInputs() {
	const val1 = document.getElementById("option1").value.trim();
	const val2 = document.getElementById("option2").value.trim();
	flipButton.disabled = !(val1 && val2);
}

// When the flip button is clicked...
flipButton.addEventListener("click", function() {
	// Get the values from the input fields
	const option1Input = document.getElementById("option1");
	const option2Input = document.getElementById("option2");

	const option1 = option1Input.value.trim();
	const option2 = option2Input.value.trim();

	// Make sure both options are filled in
	if (option1 === "" || option2 === "") {
		alert("Please enter both options before flipping the coin!");
		return;
	}

	// Set the text on the coin sides
	side1.textContent = option1;
	side2.textContent = option2;
	
	// Pick randomly between the two options
	const randomNumber = Math.random();
	let isHeads;
	
	if (randomNumber < 0.5) {
		isHeads = true;
	} else {
		isHeads = false;
	}

	let rotationAmount;
	if (isHeads === true) {
		rotationAmount = 1800; // 5 spins
	} else {
		rotationAmount = 1980; // 5.5 spins
	}
	
	// Applying rotation to the coin circle
	coin.style.transform = "rotateY(" + rotationAmount + "deg)";

	setTimeout(() => {
		const sideToShow = isHeads ? side1 : side2;
		sideToShow.classList.add("coin-result");
	}, 1990);

	// reset reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
	// When the reset button is clicked, clear everything and reset the state
	const resetButton = document.getElementById('resetButton');

	resetButton.addEventListener('click', function () {
	// Clear input fields
	document.getElementById("option1").value = "";
	document.getElementById("option2").value = "";

	// Disable flip button again
	flipButton.disabled = true;

	// Reset the coin text
	side1.textContent = "Option 1";
	side2.textContent = "Option 2";

	// Remove coin result style if added
	side1.classList.remove("coin-result");
	side2.classList.remove("coin-result");

	// Optionally reset coin rotation visually
	coin.style.transform = "rotateY(0deg)";
});
	
});
