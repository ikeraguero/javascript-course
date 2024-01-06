'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0,
      close: 24,
    },
  },

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
// Creating new restaurant object

const newRestaurant = { ...restaurant, owner: 'Giuseppe' };
console.log(newRestaurant);

// Right way to copy restaurant object

const restaurantCopy = { ...restaurant };
console.log(restaurantCopy);

// Using REST OPERATOR method (rest operator is used to collect items int(o a single array and has the same syntax as the spread operator)

restaurant.orderPizza('Mushroom', 'Onion', 'Spinach', 'Olives');
restaurant.orderPizza('Mushroom');

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
