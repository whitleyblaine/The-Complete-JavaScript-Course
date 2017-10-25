// var lastName = prompt('What is your last name?');

// console.log(lastName);

// Coding Challenge

// Constructor function to create players
function Player(name, age, height) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.score = (age * 5) + height;
}

// create objects to represent each player
var john = new Player("John", 30, 177);

var whitley = new Player("Whitley", 24, 180);

var spencer = new Player("Spencer", 24, 170);

var scores = {john: john.score, whitley: whitley.score, spencer: spencer.score};


var announceWinner = function(player, score, isTie, secondPlayer) {
  if (isTie) {
    console.log('We have a tie! Both ' + player + ' and ' + secondPlayer + ' have a score of ' + score);
  }
  else {
    console.log('And the winner is ... ' + player + ' with a score of ' + score + '!');
  }
}

if (scores.john > scores.whitley && scores.john > scores.spencer) {
  announceWinner(john.name, john.score);
} else if (scores.whitley > scores.john && scores.whitley > scores.spencer) {
  announceWinner(whitley.name, whitley.score);
} else if (scores.spencer > scores.john && scores.spencer > scores.whitley) {
  announceWinner(spencer.name, spencer.score);
} else if (scores.john === scores.whitley) {
  announceWinner(john.name, john.score, true, whitley.name);
} else if (scores.john === scores.spencer) {
  announceWinner(john.name, john.score, true, spencer.name);
} else if (scores.spencer === scores.whitley) {
  announceWinner(spencer.name, spencer.score, true, whitley.name);
}