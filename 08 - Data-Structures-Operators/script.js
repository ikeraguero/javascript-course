'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0,
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function (starterIndex, mainIndex, time, address) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  // REST OPERATORS

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// WORKING WITH STRINGS - PART 2

// Split and join

const myName = 'iker aguero pires';

const [firstName, middleName, lastName] = myName.split(' ');

const newName = ['Mr.', firstName, middleName, lastName].join(' ');
console.log(newName);

// function to capitalize name

const capitalizeName = function (names) {
  const nameArray = names.split(' ');
  const newNameArray = [];

  for (const n in nameArray) {
    newNameArray.push(
      nameArray[n].replace(nameArray[n][0], nameArray[n][0].toUpperCase())
    );
  }
  console.log(newNameArray.join(' '));
};

capitalizeName('iker aguero pires');

// Padding

// Writing a function to hide a credit card number

const hideCardNumber = function (number) {
  const cardNumber = String(number);
  const last = cardNumber.slice(-4);
  console.log(last.padStart(cardNumber.length, '*'));
};

hideCardNumber(98217826397918262);

/*
// WORKING WITH STRINGS - PART 2

// Fix capitalization name

const wrongName = 'iKeR';
const fixedName = wrongName.toLowerCase();
console.log(wrongName[0].toUpperCase() + fixedName.slice(1));

// Comparing emaisl -- create a function to compare the correct and the want-to-check email

const comparingEmails = function (correct, check) {
  const correct1 = correct.toLowerCase();
  const check1 = check.toLowerCase().trim();
  if (correct1 == check1) {
    console.log('The emails match!');
  } else {
    console.log('Emails do not match!');
  }
};

comparingEmails('ikerpires407@gmail.com', 'IkeRpIRes407@GmAIL.com');
// replacing
const airportMessage =
  'All passangers come to board on door 23. Boarding on door 23!';
const airportCorrectMessage = airportMessage.replaceAll('door', 'gate');
console.log(airportCorrectMessage);

const priceGB = '23,00£';
const priceUS = priceGB.replace(',', '.').replace('£', '$');
console.log(priceGB, priceUS);

// Booleans

const plane = 'Airbus A320neo';
if (
  plane.toLowerCase().includes('neo') &&
  plane.toLowerCase().includes('airbus')
) {
  console.log('Part of the new Airbus family');
}

// Practice - check if a passanger can go aboard with his baggage

const baggageCheck = function (baggageItems) {
  if (
    baggageItems.toLowerCase().includes('knife') ||
    baggageItems.toLowerCase().includes('gun')
  ) {
    console.log('You are not allowed to go aboard');
  } else {
    console.log('Welcome aboard!');
  }
};

baggageCheck('I have a knife');
baggageCheck('I have a camera');
baggageCheck('I have a gun');
baggageCheck('I have a football');

/*

// WORKING WITH STRINGS - PART 1

const airline = 'LATAM Airlines';
const plane = 'A328';

console.log(plane[0]);
console.log(airline.length);
console.log(airline.indexOf('M'));
console.log(airline.lastIndexOf('A'));

console.log(airline.slice(0, 5)); // sice - beginning and end point

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
console.log(airline.slice(-1));

const checkMiddleSeat = function (seat) {
  // Seats that end with B or E are middle seats
  const s = seat;
  if (seat.slice(-1) == 'B' || seat.slice(-1) == 'E') {
    console.log('That is a middle seat!');
  } else {
    console.log('Not a middle seat!');
  }
};

checkMiddleSeat('23E');
checkMiddleSeat('42B');
checkMiddleSeat('17A');
checkMiddleSeat('18F');

/*
// MAPS ITERATION

const quiz = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Python'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);

// Convert object to maps

const hoursMap = new Map(Object.entries(openingHours));

// Convert maps to arrays
console.log([...quiz]);

// Quiz app

console.log(quiz);
console.log(quiz.get('question'));
for (const [key, value] of quiz) {
  if (typeof key === 'number') {
    console.log(`Option ${key} - ${value}`);
  }
}

const answer = Number(prompt('What is your answer?'));

console.log(quiz.get(answer === quiz.get('correct')));

/*
// MAPS

// creating a map and setting values (keys, values)

const rest = new Map();
rest
  .set('name', 'Clasico Italiano')
  .set(1, 'Fiorano, Italy')
  .set(2, 'Turin, Italy')
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');
console.log(rest);

rest.delete(2);
console.log(rest);

// map.get to access the key's value

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
/*

// SETS - used for work with unique values, will always show the amount of unique values in an array or letters on a string

const meals = new Set(['Pizza', 'Pizza', 'Pasta', 'Gnocci']);
console.log(meals);

meals.add('Garlic Bread');
console.log(meals);

meals.delete('Pasta');
console.log(meals);

for (const meal of meals) {
  console.log(meal);
}

// Example

const staff = ['Chef', 'Waiter', 'Manager', 'Waiter', 'Waiter', 'Chef'];
const uniqueStaffPositions = [...new Set(staff)];
console.log(uniqueStaffPositions);

// LOOPING OBJETCS: KEYS, VALUES AND ENTRIES

// Properties of the object

const properties = Object.keys(openingHours);
console.log(properties);

// Property values

const values = Object.values(openingHours);
console.log(values);

// Entire object

const entries = Object.entries(openingHours);
console.log(entries);

// [key, value]

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

/*

// OPTIONAL CHAINING - checking if previous element exist before executing something

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} we open at ${open}`);
}

// Methods

console.log(restaurant.order?.(1, 0) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(1, 0) ?? 'Method does not exist');

// Arrays

const users = [];

console.log(users[0]?.name ?? 'User array is empty');

/*

// FOR OF LOOP

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1} - ${el}`);
}

/*

const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Antonio Giovinazzi',
};

// Nullish assignment operator (it'll assign the new value to the variable if the current value is null or undefined)

rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND operator (it'll assign the new value to the variable if the current value is truthy)

rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
console.log(rest1);
console.log(rest2);

/*
restaurant.orderDelivery({
  time: '22:30',
  address: 'Rua Dona Cezarina, 101',
  mainIndex: 2,
  starterIndex: 2,
});

// Expanding the array

const arr = [3, 4, 5];
const newArr = [1, 2, ...arr];
console.log(arr, newArr);

// Displaying elements individually

console.log(...newArr);

// Creating a new menu

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array

const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Spread Operator works on all iterables (arrays, strings, maps and sets, NOT objetcs)

const str = 'Iker';
const letters = [...str];
console.log(letters);

// Real World example

/* restaurant.orderPasta(
  prompt('Ingredient 1?'),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?')
);

*/

/*
// Creating new restaurant object

const newRestaurant = { ...restaurant, owner: 'Giuseppe' };
console.log(newRestaurant);

// Right way to copy restaurant object

const restaurantCopy = { ...restaurant };
console.log(restaurantCopy);

// Using REST OPERATOR method (rest operator is used to collect items int(o a single array and has the same syntax as the spread operator)

restaurant.orderPizza('Mushroom', 'Onion', 'Spinach', 'Olives');
restaurant.orderPizza('Mushroom');

//Short-circuiting definition: OR operator returns the first truthy value in the operation and the AND operator return first falsy value

&& - if first operant is true, it will return whatever the second operant is
|| - if first operant is false, it will return whatever the second operant is


console.log(undefined || 'Iker');
console.log(undefined && 'Iker');

// Nullish operator (null and undefined (NOT 0 or ''))

const guestsCorrect = restaurant.numGuests ?? 10;


//(if the restaurant.numGuest is nullish, return 10, otherwise, return restaurant.numGuests)

/* 
// Destructing objects

const { name, openingHours, categories } = restaurant;

// Setting a variable name for destructing

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

// Default values

const { menu = [], starterMenu: starter = [] } = restaurant;

// Mutating variables

let a = 111;
let b = 999;
const obj = {
  a: 23,
  b: 7,
  c: 14,
}(({ a, b } = obj));

// Nested objects

const {
  fri: { open, close },
} = openingHours;

/*

const arr = [2, 3, 4];

const [x, y, z] = arr;

const [main, , secondary] = restaurant.categories;

// Switching variables

[main, secondary] = [secondary, main];

// Receive 2 return values from a function

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, j, [k, l]] = nested;

// Default values

const [p = 1, q = 1, r = 1] = [8];
console.log(p, q, r);

*/
