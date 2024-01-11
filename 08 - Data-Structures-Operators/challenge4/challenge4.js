'use strict';

/* Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.
Test data (pasted to textarea, including spaces):
underscore_case
first_name
Some_Variable
calculate_AGE
delayed_departure
Should produce this output (5 separate console.log outputs):
underscoreCase ✅
firstName ✅✅
someVariable ✅✅✅
calculateAge ✅✅✅✅
delayedDeparture ✅✅✅✅✅
Hints:
§ Remember which character defines a new line in the textarea 😉
§ The solution only needs to work for a variable made out of 2 words, like a_b
§ Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working 😉
§ This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  // Getting the value from the textarea
  const text = document.querySelector('textarea').value;
  console.log(text);

  // Splitting the string into an array where each variable is a diferent item
  const SplitedText = text.split('\n');
  // console.log(SplitedText);

  const upperCaseArr = [];
  for (const variable of SplitedText) {
    const splittedVariable = variable.split('_');
    //console.log(splittedVariable);
    const [firstWord, secondWord] = splittedVariable;
    const firstWordCorrect = firstWord.toLowerCase();
    const secondWordCorrect = secondWord.replace(
      secondWord[0],
      secondWord[0].toUpperCase()
    );
    upperCaseArr.push([firstWordCorrect, secondWordCorrect]);
  }
  for (const [i, newVariables] of upperCaseArr.entries()) {
    // console.log(newVariables.join(''));
    upperCaseArr[i] = newVariables.join('');
  }
  console.log(upperCaseArr.join('\n'));
});
