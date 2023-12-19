'use strict';

/* LECTURE: Functions
1. Write a function called 'describeCountry' which takes three parameters:
'country', 'population' and 'capitalCity'. Based on this input, the
function returns a string with this format: 'Finland has 6 million people and its
capital city is Helsinki'
2. Call this function 3 times, with input data for 3 different countries. Store the
returned values in 3 different variables, and log them to the console */

function describeCountry(country, population, capitalCity) {
    return (`${country} has ${population} million people an its capital city is ${capitalCity}`)
};

const firstCountry = describeCountry('Spain', 47, 'Madrid');
const secondCountry = describeCountry('United Kingdom', 67, 'London');
const thirdCountry = describeCountry('Argentina', 45, 'Buenos Aires');

console.log(firstCountry);
console.log(secondCountry);
console.log(thirdCountry);