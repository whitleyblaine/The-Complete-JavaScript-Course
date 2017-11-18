// Function constructor

// var john = {
//   name: "John",
//   yearOfBirth: 1990,
//   job: "teacher",
// };

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

// Inheritance and prototypes:
Person.prototype.calculateAge = function() {
  console.log(2017 - this.yearOfBirth);
}
// a new INSTANCE of the Person object
var john = new Person('John', 1990, 'teacher');

// 1. 'new' operator -- a new, empty object is created
// 2. Person function is called, with three arguments, creating a new execution context
// In a regular function call, 'this' points to the global object. but that's not what we want -- so the 'new' operator makes it so that the 'this' keyword points to the empty object created in the beginning
// 3. The new empty object now has the properties from the arguments we passed in
// 4. The new object is assigned to the variable "john"

john.calculateAge();