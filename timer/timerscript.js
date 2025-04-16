document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById("timerForm");
	const select = document.getElementById("timeSelect");
	const dilemmaInput = document.getElementById("dilemma");
	const timerDisplay = document.getElementById("timerDisplay");
	const result = document.getElementById("resultMessage");

	let countdown; // Timer interval
	let totalSeconds; // Total time in seconds

	form.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent page refresh on submit

		result.textContent = ""; // Clear old result
		totalSeconds = parseInt(select.value);
		let secondsLeft = totalSeconds;
  
		updateTimerDisplay(secondsLeft);
		clearInterval(countdown); // Clear any existing timer

		countdown = setInterval(function () {
		secondsLeft--;

		updateTimerDisplay(secondsLeft);

		if (secondsLeft <= 0) {
			clearInterval(countdown);
			showResult(totalSeconds, dilemmaInput.value);
		}
	}, 1000);
	});

	// Format timer display in mm:ss
	function updateTimerDisplay(seconds) {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		timerDisplay.textContent = pad(minutes) + ":" + pad(secs);
	}

	// Show result message after time is up
	function showResult(secondsUsed, dilemmaText) {
		const secondsInDay = 86400;
		const percent = ((secondsUsed / secondsInDay) * 100).toFixed(3);
		result.innerHTML = `⏰ You spent <strong>${percent}%</strong> of your day deciding <em>“${dilemmaText}”</em>.`;
	}

	// Pad numbers less than 10 with a zero
	function pad(num) {
		return num < 10 ? "0" + num : num;
	}
	});
