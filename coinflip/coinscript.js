// Parts of the code were learnt from - https://codepen.io/hisivasankar/pen/yWZbPJ 
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

	// Adding background color change after animation is completed
	setTimeout(() => {
		const bgColor = isHeads ? "#F26726" : "#F26726";
		const font = "'Oliver', sans-serif";
		const fontSize = "1.4rem";
	
		const sideToShow = isHeads ? side1 : side2;
	
		sideToShow.style.backgroundColor = bgColor;
		sideToShow.style.fontFamily = font;
		sideToShow.style.fontSize = fontSize;
	}, 1990); //After max spins
	
});
