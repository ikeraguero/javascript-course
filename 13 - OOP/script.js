"use strict";

// Class declaration

class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

/*
// Constructor function

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NEVER BUILD METHODS INSIDE CONSTRUCTOR FUNCTIONS
  //this.calcAge = function () {
  //  console.log(new Date().getFullYear() - this.birthYear);
  //};
};

const iker = new Person("Iker", 2004);
console.log(iker);
// 1. New empty object {} is created
// 2. function is called, .this = {}
// 3. Object is linked to prototype
// 4. function automatically returns {}

// Prototypes

//defining the prototype of objects linked to Person
Person.prototype.calcAge = function () {
  console.log(new Date().getFullYear() - this.birthYear);
};

iker.calcAge();

Person.prototype.species = "Homo Sapiens";

console.log(iker.species);

console.log(iker.__proto__);
console.log(iker.__proto__.__proto__);
console.log(iker.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);
*/
