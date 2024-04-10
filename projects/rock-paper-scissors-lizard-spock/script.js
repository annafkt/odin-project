/*
Rules: object properties beat their value 
*****************************************/
const RULES = {

  'rock': ['lizard', 'scissors'],
  'paper': ['rock', 'spock'],
  'scissors': ['paper', 'lizard'],
  'lizard': ['spock', 'paper'],
  'spock': ['scissors', 'rock']

};

const popUps = document.querySelectorAll('.pop-up');
const xMarks = document.querySelectorAll('.x-mark-wrapper');

const handSignals = document.querySelectorAll('.hand-signals .wrapper');

let playerPoints = 0;
let computerPoints = 0;

/*
Manage pop-ups
*********************/

document.querySelector('.rules-button-wrapper').addEventListener('click', () => {
  document.documentElement.scrollTo({top: 0, behavior: 'smooth'});

  popUps.forEach(popUp => {
    if (popUp.classList.contains('rules-container')) {
      popUp.classList.add('reveal');
    }
  });
});

xMarks.forEach(xMark => {
  xMark.addEventListener('click', () => {
    popUps.forEach(popUp => {
      popUp.classList.remove('reveal');
    });
  });
});

/*
Game logic
**********/

handSignals.forEach(signal => {
  signal.addEventListener('click', (e) => {
    const playerChoice = e.currentTarget.firstElementChild.id;
    const computerChoice = getComputerChoice();

    addPoints(playerChoice, computerChoice);
  });
});

function getComputerChoice() {
  const options = Object.keys(RULES);

  return options[Math.floor(Math.random() * options.length)];
}

function addPoints(playerChoice, computerChoice) {
  const playerScore = document.querySelector('.score .player p');
  const computerScore = document.querySelector('.score .computer p');

  if (playerChoice == computerChoice) {
    playerPoints += 1;
    computerPoints += 1;
  } else if (RULES[playerChoice].includes(computerChoice)) {
    playerPoints += 1;
  } else {
    computerPoints += 1;
  }

  playerScore.textContent = playerPoints;
  computerScore.textContent = computerPoints;

  if (playerPoints == 5 || computerPoints == 5) {
    displayFinalResult();

    playerPoints = 0;
    computerPoints = 0;
    playerScore.textContent = 0;
    computerScore.textContent = 0;
  }
}

function displayFinalResult() {
  const resultCard = document.querySelector('.final-result-container');
  const para = document.querySelector('.final-result-container p');

  if (playerPoints > computerPoints) {
    para.textContent = 'You won!';
  } else if (playerPoints < computerPoints) {
    para.textContent = 'You lost!';
  } else {
    para.textContent = 'The game ended in a tie.';
  }
  
  document.documentElement.scrollTo({top: 0, behavior: 'smooth'});

  resultCard.classList.add('reveal');
}