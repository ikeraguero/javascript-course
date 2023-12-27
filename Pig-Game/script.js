'use strict';

// Initial game conditions and difining variables

let score0 = (document.getElementById('score--0').textContent = 0);
let score1 = (document.getElementById('score--1').textContent = 0);

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
let currentScore0 = Number(document.getElementById('current--0').textContent);
let currentScore1 = Number(document.getElementById('current--1').textContent);

// User rolls dice

btnRoll.addEventListener('click', function () {
  let randomDiceRoll = Math.trunc(Math.random(6) * 6 + 1);
  dice.src = `dice-${randomDiceRoll}.png`;
  dice.classList.remove('hidden');

  // If dice roll number isn't 1
  if (player1.classList.contains('player--active')) {
    if (randomDiceRoll !== 1) {
      currentScore0 = currentScore0 + randomDiceRoll;
      document.getElementById('current--0').textContent = currentScore0;
    } else if (randomDiceRoll === 1) {
      currentScore0 = 0;
      document.getElementById('current--0').textContent = currentScore0;
      player1.classList.remove('player--active');
      player2.classList.add('player--active');
    }
  } else if (player2.classList.contains('player--active')) {
    if (randomDiceRoll !== 1) {
      currentScore1 = currentScore1 + randomDiceRoll;
      document.getElementById('current--1').textContent = currentScore1;
      console.log(currentScore1);
    } else if (randomDiceRoll === 1) {
      currentScore1 = 0;
      document.getElementById('current--1').textContent = currentScore1;
      player2.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  }
});
