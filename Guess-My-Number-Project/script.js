'use strict';

/* Selecting and manipulating HTML elements - DOM 

console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct answer!';

document.querySelector('.number').textContent = 10;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;

*/

/*Creating a random number in the beginning of the game */
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

// Creating the function that JavaScript is going to call once the event of Click happens.
const guessFunction = function () {
  // Selecting the input value and storing it in a variable
  const guess = Number(document.querySelector('.guess').value);

  // Empty value
  if (!guess) {
    document.querySelector('.message').textContent = 'No Number!';
  }
  // Correct value
  else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'Correct answer';
    document.querySelector('.highscore').textContent = highscore;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    if (secretNumber > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // Value too high
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'Game over!';
      document.querySelector('.score').textContent = 0;
    }

    // Value too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'Game over!';
      document.querySelector('.score').textContent = 0;
    }
  }
};

/* Selecting the button and defining what's going to happen when it's clicked by passing the function defined above as the second argument*/
document.querySelector('.check').addEventListener('click', guessFunction);

// Play again when click 'Again' button

document.querySelector('.again').addEventListener('click', againFunction);
