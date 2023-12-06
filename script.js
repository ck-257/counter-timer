let timer;
let seconds = 0; // Initial countdown time set to 0
let stopHistory = []; // Array to store stop moments
let isPaused = false; // Track if the timer is paused

function startTimer() {
  if (!timer || isPaused) {
    if (stopHistory.length === 0 || isPaused) {
      seconds = parseInt(document.getElementById('timeInput').value);
    }
    timer = setInterval(updateDisplay, 1000);
    playSound(); // Start playing sound when the timer starts or resumes
    isPaused = false;
  }
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
  stopHistory.push(formatTime(seconds));
  updateDisplay();
  updateHistory();
  pauseSound(); // Pause sound when the timer stops
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  stopHistory = [];
  document.getElementById('display').innerText = formatTime(seconds);
  updateHistory();
  pauseSound(); // Pause sound when the timer resets
}

function updateDisplay() {
  seconds--;
  if (seconds >= 0) {
    document.getElementById('display').innerText = formatTime(seconds);
  } else {
    clearInterval(timer);
    timer = null;
    document.getElementById('display').innerText = "Time's up!";
    pauseSound(); // Stop sound when the timer ends
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateHistory() {
  const stopList = document.getElementById('stopList');
  stopList.innerHTML = "";
  stopHistory.forEach(stop => {
    const listItem = document.createElement('li');
    listItem.textContent = `Timer stopped at ${stop}`;
    stopList.appendChild(listItem);
  });
}

function playSound() {
  const audio = document.getElementById('myAudio');
  audio.loop = true; // Loop the sound
  audio.play();
}

function pauseSound() {
  const audio = document.getElementById('myAudio');
  audio.pause();
}

document.getElementById('display').innerText = formatTime(seconds);
updateHistory();
