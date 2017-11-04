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

// To toggle active class from player names
var player1PanelClasses = document.querySelector(".player-0-panel").classList;
var player2PanelClasses = document.querySelector(".player-1-panel").classList;

var diceDOM = document.querySelector('.dice');

diceDOM.style.display = 'none';

// Start new game
newGameBtn.addEventListener('click', function() {
  globalScores = [0, 0];
  roundScore = 0;
  globalScoreDisplays[0].innerHTML = '0';
  globalScoreDisplays[1].innerHTML = '0';
  roundScoreDisplays[activePlayer].innerHTML = '0';
  activePlayer = 0;
  diceDOM.style.display = 'none';

  if (player2PanelClasses.contains("active")) {
    player1PanelClasses.add("active");
    player2PanelClasses.remove("active");
  }
  // Undo winner effects
  document.querySelector(".winner").innerHTML = "PLAYER " + activePlayer;
  document.querySelector(".winner").classList.remove("winner");

  rollBtn.disabled = false;
  holdBtn.disabled = false;
}, false)

// Roll dice
rollBtn.addEventListener('click', function() {
  // 1. Random number
  var diceRollValue = Math.ceil(Math.random() * 6);

  // 2. Display the result
  diceDOM.style.display = 'block';
  diceDOM.src = "dice-" + diceRollValue + ".png";

  // 3. Update the round score IF the rolled number was NOT a 1
  if (diceRollValue !== 1) {
    roundScore += diceRollValue;
    roundScoreDisplays[activePlayer].innerHTML = roundScore;
  } else {
    changeActivePlayer();
  }
}, false)

// Hold points
holdBtn.addEventListener('click', function() {
  globalScores[activePlayer] += roundScore;
  globalScoreDisplays[activePlayer].innerHTML = globalScores[activePlayer];
  roundScore = 0;
  roundScoreDisplays[activePlayer].innerHTML = '0';
  if (globalScores[activePlayer] < 100) {
    changeActivePlayer();
  } else {
    endGame(activePlayer);
  }
}, false)


// Change players
function changeActivePlayer() {
  roundScore = 0;
  roundScoreDisplays[activePlayer].innerHTML = roundScore;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  player1PanelClasses.toggle("active");
  player2PanelClasses.toggle("active");
}

// End Game
function endGame(winner) {
  // Disable buttons
  rollBtn.disabled = true;
  holdBtn.disabled = true;
  // Add winner class
  var winnerClasses = document.querySelector("#name-" + winner).classList;
  winnerClasses.add("winner");
  // Announce winner
  document.querySelector(".winner").innerHTML = "WINNER!!!";
}