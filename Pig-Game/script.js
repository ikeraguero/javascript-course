'use strict';

// Initial game conditions and difining variables

let score1 = (document.getElementById('score--0').textContent = 0);
let score2 = (document.getElementById('score--1').textContent = 0);

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');

// User rolls dice

btnRoll.addEventListener('click', function () {
  let randomDiceRoll = Math.trunc(Math.random(6) * 6 + 1);
  dice.src = `dice-${randomDiceRoll}.png`;
  dice.classList.remove('hidden');

  // If dice roll number isn't 1
  if (player1.classList.contains('player--active')) {
    if (randomDiceRoll !== 1) {
      score1 = score1 + randomDiceRoll;
      document.getElementById('score--0').textContent = score1;
    } else if (randomDiceRoll === 1) {
      score1 = 0;
      document.getElementById('score--0').textContent = score1;
      player1.classList.remove('player--active');
      player2.classList.add('player--active');
    }
  } else if (player2.classList.contains('player--active')) {
    if (randomDiceRoll !== 1) {
      score2 = score2 + randomDiceRoll;
      document.getElementById('score--1').textContent = score2;
      console.log(score2);
    } else if (randomDiceRoll === 1) {
      score2 = 0;
      document.getElementById('score--1').textContent = score2;
      player2.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  }
});
