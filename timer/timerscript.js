document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById("timerForm");
	const timeDropdown = document.getElementById("timeSelect");
	const dilemmaInput = document.getElementById("dilemma");
	const timerBox = document.getElementById("timerDisplay");

	const submitButton = document.getElementById("submitButton");
submitButton.disabled = true; 

function toggleButtonState() {
	const hasDilemma = dilemmaInput.value.trim().length > 0;
	submitButton.disabled = !hasDilemma;
}

dilemmaInput.addEventListener("input", toggleButtonState);


	let countdown; // this will store the setInterval
	let totalTime; // how much time user chose

	form.addEventListener("submit", function (event) {
		event.preventDefault(); // stop the page from refreshing

		clearInterval(countdown); // stop any previous timer
		timerBox.innerText = ""; // clear anything that was there

		totalTime = parseInt(timeDropdown.value);
		let timeLeft = totalTime;

		showTime(timeLeft); // show the starting time

		countdown = setInterval(function () {
			timeLeft--;
			showTime(timeLeft);

			if (timeLeft <= 0) {
				clearInterval(countdown);
				showResult(totalTime, dilemmaInput.value);
			}
		}, 1000);
	});

	function showTime(seconds) {
		let mins = Math.floor(seconds / 60);
		let secs = seconds % 60;

		timerBox.innerText = format(mins) + ":" + format(secs);
	}

	function showResult(timeSpent, dilemma) {
		let totalSecondsInDay = 86400;
		let percentUsed = ((timeSpent / totalSecondsInDay) * 100).toFixed(3);
	
		timerBox.classList.add("result-on"); // For styling
	
		timerBox.innerHTML = `
			<span>
				You just spent <br><span class="highlighted">${percentUsed}%</span> <br>of your day deciding<br>
				<span class="highlighted"> ${dilemma}</span>
			</span>
		`;

		document.getElementById('suggestion').classList.add('show');
	}

	function format(number) {
		return number < 10 ? "0" + number : number;
	}

	const resetButton = document.getElementById('resetButton');

	resetButton.addEventListener('click', function () {
	// Stop any active timer
	clearInterval(countdown);

	// Reset the timer display
	timerBox.innerText = "00:00";
	timerBox.classList.remove("result-on");

	// Clear input
	dilemmaInput.value = "";

	// Reset dropdown
	timeDropdown.value = "3";

	// Disable the submit button again
	submitButton.disabled = true;

	// Hide suggestion card if shown
	const suggestionCard = document.getElementById('suggestion');
	if (suggestionCard) {
		suggestionCard.classList.remove('show');
	}
});

});
