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