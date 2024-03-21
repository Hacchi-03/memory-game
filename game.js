// Movie data
const movies = [
    { name: "🦁👑", title: "The Lion King" },
    { name: "🔫🍕", title: "Pulp Fiction" },
    { name: "🧙‍♂️🎂", title: "Harry Potter" },
    // Add more movies here
  ];
  
  // Phrases
  const winPhrases = ["Congratulations!", "You're a movie genius!", "Well done!"];
  const losePhrases = ["Better luck next time!", "Don't worry, try again!", "Almost there!"];
  const zeroPhrases = ["Try Again!","Your Score is 0","gain knowledge about movies"];
  // DOM elements
  let backGround = new Audio('./assets/backgound.mp3');
  let submit = new Audio('./assets/move.mp3');
  let win= new Audio('./assets/win.mp3');
  const movieTitleElement = document.getElementById("movie-title");
  const userInputElement = document.getElementById("user-input");
  const submitBtn = document.getElementById("submit-btn");
  const scoreElement = document.getElementById("score");
  const gameOverPopup = document.getElementById("game-over-popup");
  const gameOverMessage = document.getElementById("game-over-message");
  const finalScoreDisplay = document.getElementById("final-score");
  const playAgainButton = document.getElementById("play-again-button");

  
  // Game state
  let score = 0;
  let currentMovieIndex = 0;
  let timer;
  
  // Initialize game
  initGame();
  
  // Initialize game function
  function initGame() {
    backGround.play()
    backGround.volume=0.7;
    displayMovieTitle();
    startTimer();
  }
  
  // Display movie title function
  function displayMovieTitle() {
    movieTitleElement.textContent = movies[currentMovieIndex].name;
  }
  
  // Start timer function
  function startTimer() {
    let timeLeft = 25;
    updateTimerDisplay(timeLeft);
  
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay(timeLeft);
      if (timeLeft === 0) {
        clearInterval(timer);
        gameOver();
      }
    }, 1000);
  }
  
  function updateTimerDisplay(timeLeft) {
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = timeLeft;
  }
  
  
  // Submit button click event
  submitBtn.addEventListener("click", () => {
    const userGuess = userInputElement.value.trim().toLowerCase();
    const correctAnswer = movies[currentMovieIndex].title.toLowerCase();
    submit.play()
    submit.volume=0.9;
  
    if (userGuess === correctAnswer) {
      score++;
      scoreElement.textContent = score;
      currentMovieIndex++;
      clearTimeout(timer);
      if (currentMovieIndex < movies.length) {
        displayMovieTitle();
        startTimer();
        userInputElement.value = "";
      } else {
        gameOver();
        clearInterval(timer);
      }
    } else {
      gameOver();
      clearInterval(timer);
    }
  });
  
  // End game function
  function gameOver() {
    let message = "";
    if (score === 3) {
        const randomIndex = Math.floor(Math.random() * winPhrases.length);
        message = winPhrases[randomIndex];
    } else if (score < 3 && score > 0) {
        const randomIndex = Math.floor(Math.random() * losePhrases.length);
        message = losePhrases[randomIndex];
    } else if (score === 0) {
        const randomIndex = Math.floor(Math.random() * zeroPhrases.length);
        message = zeroPhrases[randomIndex];
    }
    gameOverMessage.textContent = message;
    finalScoreDisplay.textContent = score;
    gameOverPopup.style.display = "block";
}
  function resetGame() {
    window.location.reload();
  }
  playAgainButton.addEventListener("click", resetGame);

  
  
