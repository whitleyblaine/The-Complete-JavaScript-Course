/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

"use strict";

var globalScores = [0, 0];
var roundScores = [0, 0];
var turn = 0;

var newGameBtn = document.getElementsByClassName('btn-new')[0];
var rollBtn = document.getElementsByClassName('btn-roll')[0];
var holdBtn = document.getElementsByClassName('btn-hold')[0];
var globalScoreDisplays = document.getElementsByClassName('player-score');
var roundScoreDisplays = document.getElementsByClassName('player-current-score');
var diceRollValue;

var diceImage = document.getElementsByClassName('dice')[0];

function turnChange() {
  if (turn === 0) {
    turn = 1;
  } else {
    turn = 0;
  }
}

newGameBtn.onclick = function() {
 globalScores = [0, 0];
 roundScores = [0, 0];
 globalScoreDisplays[0].innerHTML = '0';
 globalScoreDisplays[1].innerHTML = '0';
 roundScoreDisplays[0].innerHTML = '0';
 roundScoreDisplays[1].innerHTML = '0';
}

rollBtn.onclick = function() {
  diceRollValue = Math.floor(Math.random() * 7);

  diceImage.src = "dice-" + diceRollValue + ".png";

  if (diceRollValue != 1) {
    roundScores[turn] += diceRollValue;
  } else {
    roundScores[turn] = 0;
  }
  roundScoreDisplays[turn].innerHTML = roundScores[turn];
}
