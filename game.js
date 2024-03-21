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
  
  // DOM elements
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
    displayMovieTitle();
    startTimer();
  }
  
  // Display movie title function
  function displayMovieTitle() {
    movieTitleElement.textContent = movies[currentMovieIndex].name;
  }
  
  // Start timer function
  function startTimer() {
    timer = setTimeout(() => {
      gameOver()
    }, 25000); // 25 seconds
  }
  
  
  // Submit button click event
  submitBtn.addEventListener("click", () => {
    const userGuess = userInputElement.value.trim().toLowerCase();
    const correctAnswer = movies[currentMovieIndex].title.toLowerCase();
  
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
      }
    } else {
      gameOver();
    }
  });
  
  // End game function
  function gameOver(win) {
    if (win) {
      const randomIndex = Math.floor(Math.random() * winPhrases.length);
      gameOverMessage.textContent = winPhrases[randomIndex];
      finalScoreDisplay.textContent = score;
    } else {
      const randomIndex = Math.floor(Math.random() * losePhrases.length);
      gameOverMessage.textContent = losePhrases[randomIndex];
      finalScoreDisplay.textContent = score;
    }
    gameOverPopup.style.display = "block";
  }
  function resetGame() {
    window.location.reload();
  }
  playAgainButton.addEventListener("click", resetGame);

  
  