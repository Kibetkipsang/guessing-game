// click new game and the input box and guess button gets enabled
// number of guesses show after every guess decrementing
// set maximum number of guesses to 10
// if number of guesses gets to zero refresh the page
// add event listeners to prevent form from refreshing after every guess
// make sure game resets if user clicks new game

const startButton = document.querySelector(".start");
const inputField = document.querySelector(".game-input");
const guessButton = document.querySelector(".guess-button");
const gameForm = document.querySelector(".game-form");
const guessResult = document.querySelector(".guess-result");
const guessNumbers = document.querySelector(".guess-numbers");
const helpButton = document.querySelector(".help-button");
const instructions = document.querySelector(".instructions");

let correctGuess;
let maxGuesses = 10;

startButton.addEventListener("click", () => {
  correctGuess = Math.floor(Math.random() * 100) + 1;
  maxGuesses = 10;
  inputField.value = "";
  guessResult.textContent = "";
  inputField.disabled = false;
  inputField.style.cursor = "text";
  guessNumbers.textContent = `You have ${maxGuesses} guesses remaining!`;
});

inputField.addEventListener("input", () => {
  if (inputField.value.trim() !== "") {
    guessButton.disabled = false;
    guessButton.style.cursor = "pointer";
  } else {
    guessButton.disabled = true;
    guessButton.style.cursor = "not-allowed";
  }
});

gameForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

helpButton.addEventListener("click", () => {
  instructions.classList.toggle("visible");
});

guessButton.addEventListener("click", () => {
  guessResult.className = "guess-result";
  const inputValue = Number(inputField.value.trim());
  maxGuesses--;
  if (inputValue > correctGuess) {
    guessResult.textContent = `${inputValue} is too high!`;
    guessResult.classList.add("too-high");
  } else if (inputValue < correctGuess) {
    guessResult.textContent = `${inputValue} is too low!`;
    guessResult.classList.add("too-low");
  } else {
    const winPercentage = (maxGuesses / 10) * 100 + 1;
    guessResult.textContent = "Unbelievable! You Won!";
    guessResult.classList.add("win");
    guessNumbers.textContent = `Congratulations! Your Score Is ${winPercentage}% !!`;
    inputField.disabled = true;
    guessButton.disabled = true;
    inputField.style.cursor = "not-allowed";
    guessButton.style.cursor = "not-allowed";
    return;
  }

  if (maxGuesses > 0) {
    guessNumbers.textContent = `You have ${maxGuesses} guesses remaining!`;
  } else {
    guessNumbers.textContent =
      "You have depleted your guess counts, start a new game!";
    inputField.disabled = true;
    guessResult.textContent = "You Lost!";
    guessResult.classList.add("lose");
    guessButton.disabled = true;
    inputField.style.cursor = "not-allowed";
    guessButton.style.cursor = "not-allowed";
  }
});
