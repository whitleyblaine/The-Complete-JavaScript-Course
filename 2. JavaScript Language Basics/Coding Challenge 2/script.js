var birthYears = [2000, 1995, 1985, 1994];
var agesArr = [];

// original code
// for (i=0; i < birthYears.length; i++) {
//   var age = 2017 - birthYears[i];
//   agesArr.push(age);
// };

// improved code
for (i=0; i < birthYears.length; i++) {
  agesArr[i] = 2017 - birthYears[i];
};

for (i=0; i < agesArr.length; i++) {
  if (agesArr[i] >= 18) {
    console.log('This person is ' + agesArr[i] + ', which makes them legal!');
  } else {
    console.log('This person is ' + agesArr[i] + ', which makes them underage!');
  }
}

function printFullAge(birthYears) {
  var agesArr = [];
  var legalArr = [];

  for (i=0; i < birthYears.length; i++) {
    agesArr[i] = 2017 - birthYears[i];
  };

  for (i=0; i < agesArr.length; i++) {
    if (agesArr[i] >= 18) {
      console.log('This person is ' + agesArr[i] + ', which makes them legal!');
      legalArr.push(true);
    } else {
      console.log('This person is ' + agesArr[i] + ', which makes them underage!');
      legalArr.push(false);
    }
  }

  return legalArr;
};

var full_1 = printFullAge([1993, 2010, 2018, 1990]);
var full_2 = printFullAge([1990, 1983, 2008, 1950]);

console.log(full_1);
console.log(full_2);