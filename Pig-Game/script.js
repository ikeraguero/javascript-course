'use strict';

// Initial game conditions and difining variables

let score1 = (document.getElementById('score--0').textContent = 0);
let score2 = (document.getElementById('score--1').textContent = 0);

const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');

// User rolls dice

btnRoll.addEventListener('click', function () {
  let randomDiceRoll = Math.trunc(Math.random(6) * 6 + 1);
  console.log(randomDiceRoll);
  dice.src = `dice-${randomDiceRoll}.png`;
  dice.classList.remove('hidden');
});
