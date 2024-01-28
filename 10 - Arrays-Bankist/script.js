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

//GENERATING USERNAMES

const createUsername = function (acc) {
  // Looping over the accounts array
  acc.forEach(function (acc) {
    // Setting a new 'username' property with the formated user name
    acc.username = acc.owner
      .split(" ")
      .map(function (name) {
        return name[0].toLowerCase();
      })
      .join("");
  });

  console.log(acc.username);
};

createUsername(accounts);

// REQUEST LOAN (condition: the account needs to have at least 1 deposited that corresponds to 10% or more of the loan request value)

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  // Storing amount according to user's input
  const amount = Number(inputLoanAmount.value);
  // Using the 'some' method to check if there is SOME or ANY movement on the movements array that matches the condition for the loan to be conceeded
  const condition = currentAccount.movements.some(function (acc) {
    return acc > amount * 0.1;
  });
  // Adding the loan to the account
  if (condition && amount > 0) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  } else {
    console.log("Loan request rejected");
  }
  console.log(condition);
});

// CLOSE ACCOUNT

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  // findIndex will return the first element in the array that satisfies the function
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // Using the splice method to remove the account. findIndex function returns the index of the account that's going to be removed from the array as first initial parameter and then defining 1 as second parameter in order to remove one element
    accounts.splice(
      accounts.findIndex(function (acc) {
        return acc.username === inputCloseUsername.value;
      }),
      1
    );
    inputCloseUsername.value = "";
    inputClosePin.value = "";
    console.log(accounts);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Log in to get started";
  }
});

// TRANSFERS

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  // Defining amount and receiver according to user's input
  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });
  // Checking conditions for transfer to be possible
  console.log(currentAccount.balance);
  if (
    receiver &&
    amount <= currentAccount.balance &&
    receiver !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);
    updateUI(currentAccount);
  }
});

let currentAccount = "";

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  // Checking the account that's trying to log in
  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });
  console.log(currentAccount);
  // Checking if account's pin matches the user input
  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    updateUI(currentAccount);
  } else {
    console.log("Invalid Login");
  }
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
});

// UPDATE UI

const updateUI = function (acc) {
  displayUI(acc);
  displayMovements(acc);
  displaySummary(acc);
};

// DISPLAYING THE UI

const displayUI = function (acc) {
  containerApp.style.opacity = 100;
  labelWelcome.textContent = `Welcome back, ${acc.owner.split(" ")[0]}!`;
  calcDisplayCurrentBalance(acc);
};

const displaySummary = function (acc) {
  // Looping over the movements array in the account object
  const inTotal = acc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    });
  labelSumIn.textContent = `${inTotal}€`;

  const outTotal = acc.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    });
  labelSumOut.textContent = `${Math.abs(outTotal)}€`;

  const interestTotal = acc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (deposit) {
      return (deposit * acc.interestRate) / 100;
    })
    .filter(function (interest) {
      return interest >= 1;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    });
  labelSumInterest.textContent = `${interestTotal}€`;
};

// Displaying the movements in the movements container UI

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice("").sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (movement, i) {
    const transaction = movement > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
  <div class="movements__type movements__type--${transaction}">${
      i + 1
    } ${transaction}</div>
  <div class="movements__date">3 days ago</div>
  <div class="movements__value">${movement}€</div>
</div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });

  // SORTING MOVEMENTS
};
let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////

// Exercise 1 - Calculate the total amount that was depoisted in the bank

const totalDeposited = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(`Total depoisted is ${totalDeposited}`);

// Exercise 2 - Calculate how many 1.000 euros or more deposits there have been in the bank

const totalAThousand = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov >= 1000).length;
console.log(totalAThousand);

// Exercise 3 - Calculate the sum of the deposits and withdrawals

const sums = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? "deposited" : "withdrawal"] += cur;
      return sums;
    },
    { deposited: 0, withdrawal: 0 }
  );
console.log(sums);

// Exercise 4 - Create a function that formats every string passed in to title case

const titleCase = (str) => {
  const exceptions = [
    "and",
    "as",
    "but",
    "for",
    "if",
    "nor",
    "or",
    "so",
    "yet",
    "a",
    "an",
    "the",
    "as",
    "at",
    "by",
    "for",
    "in",
    "of",
    "off",
    "on",
    "per",
    "to",
    "up",
    "via",
  ];

  const capitalize = (str) => {
    str[0].toUpperCase() + str.slice(1);
  };

  const formated = str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return !exceptions.includes(word) ? capitalize(word) : word;
    });
  console.log(capitalize(formated));
};

titleCase("Max Verstappen is the current formula 1 world champion");
// MORE WAYS OF CREATING AND FILLING ARRAYS
const array1 = [1, 2, 3, 4, 5, 6, 7];

// Empty arrays + fill method
const x = new Array(7);

x.fill(1, 3, 6); // fills the array with the first, from the second to the third parameter;
console.log(x);

// Array.from

const y = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(y);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  ).sort((a, b) => a - b);
  console.log(movementsUI);
});

// SORTING ARRAYS

// Strings

const owners = [
  "Verstappen",
  "Hamilton",
  "Alonso",
  "Leclerc",
  "Gasly",
  "Norris",
];

console.log(owners.sort());

// Numbers

const numbers = [2, 5, 3, 18, 92, 12, 8, 1];

console.log(numbers.sort((a, b) => a - b));
console.log(numbers.sort((a, b) => b - a));

// FLAT METHOD

const arr = [[1, 2, 3], [4, 5], 6, 7];
console.log(arr.flat());

const arrDeep = [1, [2, [3]], [4, [5, 6, [7]]]];
console.log(arrDeep.flat(3));

// FLATMAP METHOD

// with flat
const overalBalance = accounts
  .map(function (acc) {
    return acc.movements;
  })
  .flat()
  .reduce(function (ac, cur) {
    return ac + cur;
  });

console.log(overalBalance);

// with flatMap
const overalBalance2 = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .reduce(function (ac, cur) {
    return ac + cur;
  });

console.log(overalBalance2);

// REDUCE METHOD

const calcDisplayCurrentBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (ac, cur) {
    return ac + cur;
  });
  labelBalance.textContent = `${acc.balance}€`;
};

/*
// FILTER METHOD - Creates a new array with the elements that match the condition defined by the callback function

const deposited = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposited);

const withdrawal = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawal);

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

// FIND METHOD - return the first value the matches the callback function condition

const account = accounts.find(function (acc) {
  return acc.owner === "Jessica Davis";
});

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
