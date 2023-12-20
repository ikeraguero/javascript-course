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


/* ECTURE: Function Declarations vs. Expressions
1. The world population is 7900 million people. Create a function declaration
called 'percentageOfWorld1' which receives a 'population' value, and
returns the percentage of the world population that the given population
represents. For example, China has 1441 million people, so it's about 18.2% of
the world population
2. To calculate the percentage, divide the given 'population' value by 7900
and then multiply by 100
3. Call 'percentageOfWorld1' for 3 populations of countries of your choice,
store the results into variables, and log them to the console
4. Create a function expression which does the exact same thing, called
'percentageOfWorld2', and also call it with 3 country populations (can be
the same populations) */

function percentageOfWorld1(population) {
    return ((population / 7900) * 100)
}

const percentageOfNetherlands = percentageOfWorld1(17);
const percentageOfEgypt = percentageOfWorld1(107);
const percentageOfMexico = percentageOfWorld1(126);

const percentageOfWorld2 = function (population) {
    return ((population / 7900) * 100)
}

const percentageOfNetherlands2 = percentageOfWorld2(17);
const percentageOfEgypt2 = percentageOfWorld2(107);
const percentageOfMexico2 = percentageOfWorld2(126);

/* LECTURE: Arrow Functions
1. Recreate the last assignment, but this time create an arrow function called
'percentageOfWorld3' */

const percentageOfWorld3 = population => (population / 7900) * 100;
console.log(percentageOfWorld3(17));
console.log(percentageOfWorld3(107));
console.log(percentageOfWorld3(126));

/* LECTURE: Functions Calling Other Functions
1. Create a function called 'describePopulation'. Use the function type you
like the most. This function takes in two arguments: 'country' and
'population', and returns a string like this: 'China has 1441 million people,
which is about 18.2% of the world.'
2. To calculate the percentage, 'describePopulation' call the
'percentageOfWorld1' you created earlier
3. Call 'describePopulation' with data for 3 countries of your choice */

const describePopulation = function (country, population) {
    return `${country} has ${population} million people which is about ${percentageOfWorld1(population)}% of the world`
}

console.log(describePopulation('China', 1441))

/* LECTURE: Introduction to Arrays
1. Create an array containing 4 population values of 4 countries of your choice.
You may use the values you have been using previously. Store this array into a
variable called 'populations'
2. Log to the console whether the array has 4 elements or not (true or false)
3. Create an array called 'percentages' containing the percentages of the
world population for these 4 population values. Use the function
'percentageOfWorld1' that you created earlier to compute the 4
percentage values */

const populations = [38, 2, 6, 11]
console.log(populations.length === 4);

const percentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3])]
console.log(percentages);