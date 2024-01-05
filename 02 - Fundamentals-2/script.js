'use strict';

const Jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    friends: ['Michael', 'Lewis', 'Max'],
    birthYear: 1991,
    hasDriversLicense: true,
    job: 'teacher',

    calcAge: function () {
        this.age = 2023 - this.birthYear;
        return this.age
    },

    getSummary: function () {
        return (`${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense === true ? 'a' : 'no'} driver's license`)
    }
}

console.log(Jonas.calcAge());
console.log(Jonas.getSummary());


