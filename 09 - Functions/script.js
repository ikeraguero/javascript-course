'use strict';

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
