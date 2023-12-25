'use strict';

/* Selecting and manipulating HTML elements - DOM 

console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct answer!';

document.querySelector('.number').textContent = 10;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;

*/

/* Creating the function that JavaScript is going to call once the event of Click happens. */
const x = function () {
  /* Selecting the input value and storing it in a variable */
  const guess = Number(document.querySelector('.guess').value);

  /* Check if there are any number stored in the variable */
  if (!guess) {
    document.querySelector('.message').textContent = 'No Number!';
  }
};

document.querySelector('.check').addEventListener('click', x);
