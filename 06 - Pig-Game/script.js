'use strict';

// Initial game conditions and difining variables

let score0 = (document.getElementById('score--0').textContent = 0);
let score1 = (document.getElementById('score--1').textContent = 0);

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let currentScore, playerActive, playing, scores;
// Starting conditions function

const startGame = function () {
  score0 = document.getElementById('score--0').textContent = 0;
  score1 = document.getElementById('score--1').textContent = 0;
  currentScore = 0;
  document.querySelector(`#current--0`).textContent = currentScore;
  document.querySelector(`#current--1`).textContent = currentScore;
  playerActive = 0;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  playing = true;
  scores = [0, 0];
};

// Switch player function

const playerSwitch = function () {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  currentScore = 0;
  document.querySelector(`#current--${playerActive}`).textContent =
    currentScore;
  playerActive = playerActive === 0 ? 1 : 0;
};

startGame();
// Rolling the dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    let randomRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(randomRoll);
    dice.src = `dice-${randomRoll}.png`;
    dice.classList.remove('hidden');

    if (randomRoll === 1) {
      //Switch player
      playerSwitch();
    } else {
      // Add roll to current score e display new score
      currentScore += randomRoll;
      document.querySelector(`#current--${playerActive}`).textContent =
        currentScore;
    }
  }
});

// Holding the current score

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[playerActive] += currentScore;
    document.getElementById(`score--${playerActive}`).textContent =
      scores[playerActive];

    // Defining the winning conditions
    if (scores[playerActive] >= 100) {
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add('player--winner');
      playing = false;
    } else {
      playerSwitch();
    }
  }
});

btnNew.addEventListener('click', startGame);
