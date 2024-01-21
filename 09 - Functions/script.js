'use strict';

//CALL AND APPLY METHODS

const lufthansa = {
  airline: 'Lufthansa',
  iata: 'LH',
  bookings: [],
  book: function (flightNum, passanger) {
    console.log(
      `${passanger} booked a seat on ${this.airline} flight ${this.iata}${flightNum}`
    );
    this.bookings.push([flightNum, passanger]);
  },
};

lufthansa.book(239, 'Iker Aguero');

const eurowings = {
  airline: 'Eurowings',
  iata: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Points to undefined
// book(239, 'Iker Aguero');

// Telling JS explicitly where the this keyword should point
// Call method
book.call(eurowings, 23, 'Lewis Hamilton');
console.log(eurowings);

book.call(lufthansa, 258, 'Charles Leclerc');
console.log(lufthansa);

// Apply method

const flightData = [583, 'George Russell'];
book.apply(lufthansa, flightData); //or

book.call(lufthansa, ...flightData);
console.log(lufthansa);

// Bind method

const bookLH = book.bind(lufthansa);
const bookEW = book.bind(eurowings);

bookLH(23, 'Sergio Perez');

// function to book flights to an specific flight:

const bookWE23 = book.bind(eurowings, 23);
bookWE23('Iker Aguero');
bookWE23('Lando Norris');

// With Event Handlers

lufthansa.planes = 300;
lufthansa.buyPlanes = function () {
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlanes.bind(lufthansa));

// Partial application - making a specific function out of a more generic one

const addTax = function (rate, value) {
  console.log(value + value * rate);
};

const addVat = addTax.bind(null, 0.23);
addVat(100);
addVat(200);
/*
// FUNCTIONS RETURNING FUNCTIONS

const greet = function (greet) {
  return function (name) {
    console.log(`${greet}, ${name}!`);
  };
};

const greeter = greet('Hey');
greeter('Iker');
greeter('Charles');
greeter('Max');
greeter('Jude');

greet('Hello')('Lewis');

/*
// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const oneWord = function (str) {
  return str.replace(/ /g, '');
};

// HIGH ORDER FUNCTION - USED TO ABSTRACT THE CODE USED TO TRANSFORM THE STRINGS
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by ${fn.name}`);
};

transformer('Max Verstappen is the best!', oneWord);
transformer('Max Verstappen is the best!', upperFirstWord);

// JS uses CALLBACK FUNCTIONS all the time
// VALUE VS. REFERENCE
/*
const flight = 'LA387';
const passanger = {
  name: 'Iker Aguero',
  passport: 982738928,
};

const checkIn = function (flight, passanger) {
  passanger.name = 'Mr.' + passanger.name;

  if (passanger.passport === 982738928) {
    alert(`${passanger.name} was succesfully checked-in on flight ${flight}`);
  } else {
    alert(`Couldn't check in ${passanger.name} on flight ${flight}`);
  }
};

checkIn(flight, passanger);

const newPassport = function (passanger) {
  passanger.passport = Math.trunc(Math.random() * 1000000);
};

newPassport(passanger);
checkIn(flight, passanger);

/*
// DEFAULT PARAMETERS

const bookings = [];

const createBooking = function (
  flightNum,
  numPassangers = 1,
  price = 199 * numPassangers
) {
  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  bookings.push(booking);
  console.log(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 2000);
createBooking('LH123', undefined, 2000)
*/
