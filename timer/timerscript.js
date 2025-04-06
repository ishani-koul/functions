// Get references to elements
const decisionInput = document.getElementById('decision');
const timeSlider = document.getElementById('timeSlider');
const sliderValue = document.getElementById('sliderValue');
const startButton = document.getElementById('startButton');
const timerDiv = document.getElementById('timer');
const messageDiv = document.getElementById('message');

let timerInterval;

// Update slider value display as the slider moves
timeSlider.addEventListener('input', function() {
  sliderValue.textContent = timeSlider.value;
});

// Start the timer when the button is clicked
startButton.addEventListener('click', function() {
  const decision = decisionInput.value.trim();
  if (!decision) {
    alert("Please enter what you want to decide!");
    return;
  }

  // Disable start button to avoid multiple timers
  startButton.disabled = true;
  messageDiv.textContent = "";

  // Convert selected minutes to seconds
  let timeLeft = parseInt(timeSlider.value) * 60;
  timerDiv.textContent = formatTime(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerDiv.textContent = "Time's up!";
      displayFunnyMessage(decision, parseInt(timeSlider.value));
      startButton.disabled = false;
    }
  }, 1000);
});

// Format seconds into MM:SS format
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Display a random funny message when the timer ends
function displayFunnyMessage(decision, minutes) {
  const cupsOfCoffee = Math.floor(minutes * Math.random() * 2) + 1;
  const episodesMissed = Math.floor(minutes / 5) || 1;
  messageDiv.innerHTML = `<p>You spent <strong>${minutes} minute(s)</strong> deciding <em>${decision}</em>!</p>
  <p>That's enough time to drink <strong>${cupsOfCoffee}</strong> cup(s) of coffee or watch <strong>${episodesMissed}</strong> episode(s) of your favorite show!</p>`;
}
