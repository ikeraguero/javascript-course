"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Displaying the movements in the movements container UI

const displayMovements = function () {
  console.log(containerMovements);

  movements.forEach(function (movement, i) {
    const transaction = movement > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
  <div class="movements__type movements__type--${transaction}">${i} ${transaction}</div>
  <div class="movements__date">3 days ago</div>
  <div class="movements__value">${movement}€</div>
</div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements();

//computingUsernames function

const createUsername = function () {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .split(" ")
      .map(function (name) {
        return name[0].toLowerCase();
      })
      .join("");
    console.log(acc.username);
  });
};

createUsername();
/////////////////////////////////////////////////

// FILTER METHOD - Creates a new array with the elements that match the condition defined by the callback function

// MAP METHOD - Iterates over an array and create a new one based on the callback function specifications (should always use RETURN)

const eurToUsd = 1.1;
const convertedToUsd = movements.map(function (mov) {
  return mov * eurToUsd;
});

console.log(convertedToUsd);

const movementsDescription = movements.map(function (mov, i) {
  return `Movement ${
    i + 1
  }: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`;
});

console.log(movementsDescription);
/*
// FOR EACH METHOD - MAPS AND SETS

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(["EUR", "EUR", "GBP", "USD"]);

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

/*
//FOR EACH METHOD - ARRAYS 
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Transaction ${i + 1}: You deposited ${Math.abs(mov)}`);
  } else {
    console.log(`Transaction ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});


let arr = ["a", "b", "c", "d", "e"];
// Array Methods
// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice()); // Create a shallow copy

// SPLICE - mutate the original array

//console.log(arr.splice(2));
console.log(arr.splice(-1));
console.log(arr);
console.log(arr.splice(1, 2));
console.log(arr);

// REVERSE - mutate the original array

arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());

// CONCAT

const letters = arr.concat(arr2);
console.log(letters);

// JOIN
console.log(letters.join("-"));

// AT - also works on strings
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

// getting the last element of an array
console.log(arr3.at(-1));

*/
