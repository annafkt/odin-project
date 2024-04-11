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

/*
Animation
*********/

const handSignalBackground = (color) => [
  { background: 'rgba(51, 51, 51, .8)',
    opacity: 0 },
  { background: color, 
    opacity: 1 },
  { background: 'rgba(51, 51, 51, .8)',
    opacity: 0 },
];

const handSignalTransform = [
  { transform: 'scale(1)' },
  { transform: 'scale(.95)' },
  { transform: 'scale(1)' },
];

const handSignalShadow = [
  { filter: 'drop-shadow(0.3125rem 0.3125rem 0.25rem #000)' },
  { filter: 'drop-shadow(1px 1px 1px #000)' },
  { filter: 'drop-shadow(0.3125rem 0.3125rem 0.25rem #000)' },
];

/*****************/

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

    addAnimation(playerChoice, computerChoice);
    addPoints(playerChoice, computerChoice);
  });
});

function getComputerChoice() {
  const options = Object.keys(RULES);

  return options[Math.floor(Math.random() * options.length)];
}

function addAnimation(playerChoice, computerChoice) {
  const playerChoiceButton = document.querySelector(`.wrapper.${playerChoice} .animated-div`);
  const playerChoiceButtonWrapper = document.querySelector(`.wrapper.${playerChoice}`);
  const computerChoiceButton = document.querySelector(`.wrapper.${computerChoice} .animated-div`);
  const computerChoiceButtonWrapper = document.querySelector(`.wrapper.${computerChoice}`);

  if (playerChoice == computerChoice) {
    playerChoiceButton.animate(
      handSignalBackground('linear-gradient(135deg, #00ffdd 48%, #2fa4ff 52%)'), 1000
    );
  } else {
    playerChoiceButton.animate(
      handSignalBackground('#00ffdd'), 1000
    );
    computerChoiceButton.animate(
      handSignalBackground('#2fa4ff'), 1000
    );
  }

  playerChoiceButtonWrapper.animate(
    handSignalShadow, 600
  )
  computerChoiceButtonWrapper.animate(
    handSignalShadow, 600
  )

  playerChoiceButton.animate(
    handSignalTransform, 600,
  )
  computerChoiceButton.animate(
    handSignalTransform, 600
  );
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