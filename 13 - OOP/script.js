"use strict";

// Class declaration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }
  get age() {
    const now = new Date();
    return now - this.birthYear;
  }
  // it's called when we pass the fullName argument during the creation of the object
  set fullName(name) {
    if (name.includes(" ")) {
      this._fullName = name;
    } else {
      console.log("Not a valid full name!");
    }
  }
  // call this using lewis.fullName
  get fullName() {
    return this._fullName;
  }
  // static method - only work on the class itself, not on the instances
  static hey() {
    console.log(`Hey, ${this._fullName}`);
  }
}

const lewis = new PersonCl("Lewis Hamilton", 1985);
console.log(lewis);
console.log(lewis.fullName);
PersonCl.hey();

// Object.create() - we pass in an created prototype as an argument

const PersonProto = {
  calcAge() {
    const now = new Date();
    console.log(now - this.birthYear);
  },
  init(firstName, lastName, birthYear) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  },
};

const charles = Object.create(PersonProto);
console.log(charles.init("Charles", "Leclerc", 1997));
console.log(charles);

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
