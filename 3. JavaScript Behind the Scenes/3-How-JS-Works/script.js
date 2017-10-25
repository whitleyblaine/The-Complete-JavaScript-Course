///////////////////////////////////////
// Lecture: Hoisting

// FUNCTIONS
calculateAge(1950);

function calculateAge(year) {
    console.log(2016-year);
}


// Does not work because retirement is a function expression, not a function declaration
// retirement(1993);

var retirement = function(year) {
    console.log(65 - (2016 - year));
}





// VARIABLES

// First console.log will log "undefined", which is different than if there was no var age in the code. because var age exists in the code, it is scanned in the creation phase (hoisting), and set to undefined
console.log(age);
var age = 23;
console.log(age);


function foo() {
    var age = 65;
    console.log(age);
}
foo();
console.log(age);









///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









