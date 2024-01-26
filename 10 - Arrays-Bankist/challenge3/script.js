/* Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀 */

const dogAges = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge = (arr) => {
  const humanAgeAvg = arr
    .map((dog) => {
      if (dog <= 2) {
        return dog * 2;
      } else {
        return dog * 4;
      }
    })
    .filter((age) => {
      return age >= 18;
    })
    .reduce((ac, cur, i, arr) => {
      const sum = ac + cur;
      return sum / arr.length;
    }, 0);
  console.log(humanAgeAvg);
};

calcAverageHumanAge(dogAges);
