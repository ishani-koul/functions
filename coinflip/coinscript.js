// Get elements from the page
const coin = document.getElementById("coin");
const flipButton = document.getElementById("flipButton");
const side1 = document.getElementById("side1");
const side2 = document.getElementById("side2");
const flipSound = document.getElementById("flipSound");

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
	
	// Play the coin flip sound
	flipSound.currentTime = 0;
	flipSound.play();
	
	// Pick randomly between the two options
	const randomNumber = Math.random();
	let isHeads;
	
	if (randomNumber < 0.5) {
		isHeads = true;
	} else {
		isHeads = false;
	}
	
	// Choose how much the coin should spin
	let rotationAmount;
	
	if (isHeads === true) {
		rotationAmount = 1800; // 5 full spins
	} else {
		rotationAmount = 1980; // 5.5 full spins
	}
	
	// Apply the rotation to the coin
		coin.style.transform = "rotateY(" + rotationAmount + "deg)";
	});
	