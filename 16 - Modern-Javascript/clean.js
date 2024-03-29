const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (user, limits) => {
  limits[user] ??  0;
}
const addExpensive = function (state, limits, value, description, user = 'jonas') {
  const lowerCaseUser = user.toLowerCase();
  const limit = getLimit(limits, lowerCaseUser)


  return value <= limit ? [...state, {value: -value, description, user: lowerCaseUser}] : state;
};
const newBudget1 = addExpensive(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpensive(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpensive(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');


const checkExpenses = function (state, limits) {
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user) ? {...entry, flag: 'limit'} : entry
  })
  //for (const entry of budget) {
  // const limit = getLimit(limits, entry.user)
  //
  //if (entry.value < -limit) {
  //   entry.flag = 'limit';
    }
checkExpenses(newBudget3, spendingLimits);

console.log(budget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state.filter(entry => entry.value <= -bigLimit).map(entry => entry.description.slice(-2)).join(' / ');
  console.log(bigExpenses);
  
};

logBigExpenses(newBudget3, 500)