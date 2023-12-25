'use strict';

/* Selecting and manipulating HTML elements - DOM */

console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct answer!';

document.querySelector('.number').textContent = 10;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
