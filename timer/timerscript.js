const slider = document.getElementById("timeSlider");
const timeLabel = document.getElementById("timeValue");
const startButton = document.getElementById("startButton");
const timerDisplay = document.getElementById("timerDisplay");
const result = document.getElementById("resultMessage");

let countdown; // the countdown - timer
let totalSeconds; // the chosen time

// time value label updated
slider.addEventListener("input", () => {
	const seconds = parseInt(slider.value);
	timeLabel.textContent = formatTimeText(seconds);
});

// Start button click
startButton.addEventListener("click", () => {
clearInterval(countdown); // in case there's an existing timer running
	result.textContent = ""; // clear old result
	totalSeconds = parseInt(slider.value);
	let secondsLeft = totalSeconds;

	updateTimerDisplay(secondsLeft); // show starting time immediately

	// Start the countdown
	countdown = setInterval(() => {
	secondsLeft--;
		updateTimerDisplay(secondsLeft);

	if (secondsLeft <= 0) {
		clearInterval(countdown);
		showResult(totalSeconds);
		}
	}, 1000);
});

// Format time into mm:ss 
function updateTimerDisplay(seconds) {
	const minutes = Math.floor(seconds / 60);
	const secs = seconds % 60;
	timerDisplay.textContent = `${pad(minutes)}:${pad(secs)}`;
}

// Show the result message at the end
function showResult(secondsUsed) {
	const secondsInDay = 86400;
	const percent = ((secondsUsed / secondsInDay) * 100).toFixed(3);
	result.innerHTML = `⏰ You spent <strong>${percent}%</strong> of your day making this decision.`;
}

// Manually add leading zero for numbers < 10
function pad(num) {
	return num < 10 ? "0" + num : num; 
}

// Convert seconds into human-readable label
function formatTimeText(seconds) {
	return seconds < 60 
		? `${seconds} seconds` 
		: `${Math.floor(seconds / 60)} minute${seconds >= 120 ? "s" : ""}`;
}

