'use strict';

/* Selecting and manipulating HTML elements - DOM 

console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct answer!';

document.querySelector('.number').textContent = 10;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;

*/

/*Creating a random number in the beginning of the game */
const secretNumber = Math.trunc(Math.random() * 20) + 1;
// Defining score and highscore variables
let score = Number(document.querySelector('.score').textContent);
let highscore = Number(document.querySelector('.highscore').textContent);

document.querySelector('.number').textContent = secretNumber;

// Creating the function that JavaScript is going to call once the event of Click happens.
const x = function () {
  // Selecting the input value and storing it in a variable
  const guess = Number(document.querySelector('.guess').value);

  // Check if there are any number stored in the variable */
  if (!guess) {
    document.querySelector('.message').textContent = 'No Number!';
  }
  // Check if number stored in number variable is equal to input value (guess), or, if isn't, if it's greater or lower, decrease the score by 1 and display new score
  else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'Correct answer';
    highscore = highscore + score;
    document.querySelector('.highscore').textContent = highscore;
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'Game over!';
      document.querySelector('.score').textContent = 0;
    }
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
document.querySelector('.check').addEventListener('click', x);
