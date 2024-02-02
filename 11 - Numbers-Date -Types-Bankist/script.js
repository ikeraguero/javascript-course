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
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2024-01-31T23:36:17.929Z",
    "2024-01-28T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2024-01-31T23:36:17.929Z",
    "2024-01-28T10:51:36.790Z",
  ],
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [],
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
  const amount = Math.floor(+inputLoanAmount.value);
  // Using the 'some' method to check if there is SOME or ANY movement on the movements array that matches the condition for the loan to be conceeded
  const condition = currentAccount.movements.some(function (acc) {
    return acc > amount * 0.1;
  });
  // Adding the loan to the account
  if (condition && amount > 0) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date());
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
  const amount = Math.floor(+inputTransferAmount.value);
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
    currentAccount.movementsDates.push(new Date().toISOString());
    receiver.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
});

let currentAccount = "";

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(currentAccount.locale);
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
  // Defining the date
  const now = new Date();
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  labelDate.textContent = Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
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
  labelSumIn.textContent = `${inTotal.toFixed(2)}€`;

  const outTotal = acc.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    });
  labelSumOut.textContent = `${outTotal.toFixed(2)}€`;

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
  labelSumInterest.textContent = `${interestTotal.toFixed(2)}€`;
};

const formatDate = function (date, locale) {
  const calcDaysPassed = function (date1, date2) {
    return Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  };
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) {
    return "TODAY";
  }
  if (daysPassed === 1) {
    return "YESTERDAY";
  }
  if (daysPassed <= 7) {
    return `${daysPassed} DAYS AGO`;
  } else {
    const now = new Date();
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    return Intl.DateTimeFormat(locale, options).format(now);
  }
};

// Displaying the movements in the movements container UI

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice("").sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (movement, i) {
    const transaction = movement > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${transaction}">${
      i + 1
    } ${transaction}</div>
  <div class="movements__date">${formatDate(date, acc.locale)}</div>
  <div class="movements__value">${Math.floor(movement).toFixed(2)}€</div>
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

// CALCULATE AND DISPLAY BALANCE

const calcDisplayCurrentBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (ac, cur) {
    return ac + cur;
  });
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

// LECTURES

// Operations with dates
/*
date1 = new Date();
date2 = new Date();
const daysPassed = date1 - date2 / (1000 * 60 * 60 * 24); // days passed between two dates
/*
// Dates

const now = new Date();
console.log(now);

console.log(new Date("Aug 10 2020 18:05:41"));
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); // timestamp in miliseconds of the time passed since Jan 1st 1970

console.log(new Date(232178231832103210));
console.log(Date.now());
future.setFullYear(2040);
console.log(future);

// BigInts

console.log(2 ** 52 - 1); // Maximum number JavaScript can precisely represent
console.log(28738197319287389127398173891n);
console.log(BigInt(28738197319287389127398173891));

/*
// NUMERIC SEPARATOR

// 287,450,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee = 15_00;
const transferFee2 = 1_500;

// MATH AND ROUNDING

console.log(Math.sqrt(25));
console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.min(5, 18, 23, 11, 2)); // 2

console.log(Math.trunc(Math.random() * 6) + 1);

// General function to generate random numbers

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) * 1) + min;

// Rouding integers

console.log(Math.round(23.3));
console.log(Math.ceil(23.3)); // 24
console.log(Math.floor(23.3)); // 23
console.log(Math.trunc(23.3)); // 23

// Rouding decimals

console.log((2.7).toFixed(0)); // 2
console.log((2.7).toFixed(3)); // 2.700

// CONVERTING AND CHECKING NUMBERS

// Converting
console.log(Number("3"));
console.log(+"3");

// Parsing
console.log(Number.parseInt("30px", 10));
console.log(Number.parseInt("e30", 10));

console.log(Number.parseFloat(" 2.5rem "));

// Checking if a avalue is number

console.log(Number.isFinite(20));
console.log(Number.isFinite(0));
console.log(Number.isFinite(30 / 0));
console.log(Number.isFinite("20"));
*/
