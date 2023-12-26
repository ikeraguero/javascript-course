'use strict';

/* Selecting and manipulating HTML elements - DOM 

console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct answer!';

document.querySelector('.number').textContent = 10;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;

*/

// Creating a random number in the beginning of the game
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// Defining score and highscore variables
let score = Number(document.querySelector('.score').textContent);
let highscore = Number(document.querySelector('.highscore').textContent);

// Creating the play again function
const againFunction = function () {
  score = 20;
  document.querySelector('.score').textContent = score;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
};

// Display functions

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayHighscore = function (highscore) {
  document.querySelector('.highscore').textContent = highscore;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

// Creating the function that JavaScript is going to call once the event of Click happens.
const guessFunction = function () {
  // Selecting the input value and storing it in a variable
  const guess = Number(document.querySelector('.guess').value);

  // Empty value
  if (!guess) {
    displayMessage('No Number!');
  }
  // Correct value
  else if (guess === secretNumber) {
    displayMessage('Correct answer');
    displayHighscore(highscore);
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    if (secretNumber > highscore) {
      highscore = score;
      displayHighscore(highscore);
    }
  }

  //  Wrong value
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      displayScore(score);
    } else {
      displayMessage('Game over!');
      displayScore(0);
    }
  }
};

/* Selecting the button and defining what's going to happen when it's clicked by passing the function defined above as the second argument*/
document.querySelector('.check').addEventListener('click', guessFunction);

// Play again when click 'Again' button

document.querySelector('.again').addEventListener('click', againFunction);
