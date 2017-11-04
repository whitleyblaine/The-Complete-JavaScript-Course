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
var roundScore = 0;
var activePlayer = 0;

var newGameBtn = document.querySelector('.btn-new');
var rollBtn = document.querySelector('.btn-roll');
var holdBtn = document.querySelector('.btn-hold');
var globalScoreDisplays = document.getElementsByClassName('player-score');
var roundScoreDisplays = document.getElementsByClassName('player-current-score');
var diceRollValue;

// To toggle active class from player names
var player1PanelClasses = document.getElementsByClassName("player-0-panel")[0].classList;
var player2PanelClasses = document.getElementsByClassName("player-1-panel")[0].classList;

var diceImage = document.getElementsByClassName('dice')[0];

// Start new game
newGameBtn.onclick = function() {
  globalScores = [0, 0];
  roundScore = 0;
  globalScoreDisplays[0].innerHTML = '0';
  globalScoreDisplays[1].innerHTML = '0';
  roundScoreDisplays[0].innerHTML = '0';
  roundScoreDisplays[1].innerHTML = '0';
  activePlayer = 0;
  if (player2PanelClasses.contains("active")) {
    player1PanelClasses.add("active");
    player2PanelClasses.remove("active");
  }
  // Undo winner effects
  document.getElementsByClassName("winner")[0].innerHTML = "PLAYER " + activePlayer;
  document.getElementsByClassName("winner")[0].classList.remove("winner");

  if (rollBtn.disabled) {
    rollBtn.disabled = false;
    holdBtn.disabled = false;
  }
}

// Roll dice
rollBtn.onclick = function() {
  diceRollValue = Math.ceil(Math.random() * 6);

  diceImage.src = "dice-" + diceRollValue + ".png";

  if (diceRollValue != 1) {
    roundScore += diceRollValue;
  } else {
    roundScore = 0;
    roundScoreDisplays[activePlayer].innerHTML = '0';
    changeActivePlayer();
  }
  roundScoreDisplays[activePlayer].innerHTML = roundScore;
}

// Hold points
holdBtn.onclick = function() {
  globalScores[activePlayer] += roundScore;
  globalScoreDisplays[activePlayer].innerHTML = globalScores[activePlayer];
  roundScore = 0;
  roundScoreDisplays[activePlayer].innerHTML = '0';
  if (globalScores[activePlayer] < 100) {
    changeActivePlayer();
  } else {
    endGame(activePlayer);
  }
}


// Change players
function changeActivePlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  player1PanelClasses.toggle("active");
  player2PanelClasses.toggle("active");
}

// End Game
function endGame(winner) {
  // Disable buttons
  rollBtn.disabled = true;
  holdBtn.disabled = true;
  // Add winner class
  var winnerClasses = document.getElementById("name-" + winner).classList;
  winnerClasses.add("winner");
  // Announce winner
  document.getElementsByClassName("winner")[0].innerHTML = "WINNER!!!";
}