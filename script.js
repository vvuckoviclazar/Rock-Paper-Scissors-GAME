"use strict";

const welcome = document.querySelector(".welcome");
const startGame = document.querySelector(".startGame");
const player = document.querySelector(".player");
const rounds = document.querySelector(".rounds");
const computer = document.querySelector(".computer");
const computerChoice = document.querySelector(".computerChoice");
const rules = document.querySelector(".rules");
const actionButtons = document.querySelectorAll(".action");
const disableButton = document.querySelectorAll(".disable");

startGame.addEventListener("click", (e) => {
  welcome.style.display = "none";
});

function gameCreator() {
  let playerScore = 0;
  let computerScore = 0;
  let roundsNumber = 0;
  let playerChoice = "";
  let compChoice = "";
  let playerWinnerText = "";

  const choices = ["rock", "paper", "scissors"];

  const getRandomChoice = () =>
    choices[Math.floor(Math.random() * choices.length)];

  const randomEmoji = (choice) => {
    if (choice === "rock") return "✊";
    if (choice === "paper") return "🖐️";
    if (choice === "scissors") return "✌️";
  };

  const roundCounter = () => {
    roundsNumber += 1;
    rounds.textContent = roundsNumber;
  };

  const playRound = () => {
    compChoice = getRandomChoice();
    computerChoice.textContent = randomEmoji(compChoice);

    if (playerChoice !== compChoice) {
      if (
        (playerChoice === "rock" && compChoice === "scissors") ||
        (playerChoice === "paper" && compChoice === "rock") ||
        (playerChoice === "scissors" && compChoice === "paper")
      ) {
        playerScore += 1;
        player.textContent = playerScore;
      } else {
        computerScore += 1;
        computer.textContent = computerScore;
      }
    }
    roundCounter();
    checkWinner();
  };

  const checkWinner = () => {
    if (playerScore === 3 || computerScore === 3) {
      playerWinnerText = playerScore === 3 ? "YOU WON" : "YOU LOST";
      endGame();
    }
  };

  const endGame = () => {
    rules.innerHTML = `<div class='innerDiv'><h1 class='innerH1'>${playerWinnerText}!</h1>
    <button class='restartBtn'>RESTART</button></div>`;
    disableButtons();
    const restartBtn = document.querySelector(".restartBtn");
    restartBtn.addEventListener("click", restartGame);
  };

  const restartGame = () => {
    playerScore = 0;
    computerScore = 0;
    roundsNumber = 0;
    playerChoice = "";
    compChoice = "";
    player.textContent = playerScore;
    rounds.textContent = roundsNumber;
    computer.textContent = computerScore;
    computerChoice.textContent = "?";
    rules.innerHTML = `<h1 class="rules2">First who wins 3 rounds, wins the game!</h1>`;
    enableButtons();
  };

  const disableButtons = () => {
    disableButton.forEach((button) => (button.disabled = true));
  };

  const enableButtons = () => {
    disableButton.forEach((button) => (button.disabled = false));
  };

  return {
    setPlayerChoice: (choice) => {
      playerChoice = choice;
      playRound();
    },
    restartGame,
  };
}

const game = gameCreator();

actionButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    const choice = e.target.getAttribute("id");
    game.setPlayerChoice(choice);
  })
);
