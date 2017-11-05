/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

"use strict";

var newGameBtn = document.querySelector('.btn-new');
var rollBtn = document.querySelector('.btn-roll');
var holdBtn = document.querySelector('.btn-hold');
var submitBtn = document.querySelector('.btn-submit');
var globalScoreDisplays = document.getElementsByClassName('player-score');
var roundScoreDisplays = document.getElementsByClassName('player-current-score');
var winningScoreInput = document.querySelector(".winningScoreInput");

// To toggle active class
var player1PanelClasses = document.querySelector(".player-0-panel").classList;
var player2PanelClasses = document.querySelector(".player-1-panel").classList;

var dice1DOM = document.querySelector('.dice1');
var dice2DOM = document.querySelector('.dice2');

var globalScores, roundScore, activePlayer, winningScore;

// State variable
var gamePlaying;

  init();

// Roll dice
rollBtn.addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Random number
    var dice1RollValue = Math.ceil(Math.random() * 6);
    var dice2RollValue = Math.ceil(Math.random() * 6);

    // 2. Display the result
    dice1DOM.style.display = 'block';
    dice1DOM.src = "dice-" + dice1RollValue + ".png";

    dice2DOM.style.display = 'block';
    dice2DOM.src = "dice-" + dice2RollValue + ".png";

    // 3. If player rolls two 1s, he loses global score
    if (dice1RollValue === 1 && dice2RollValue === 1) {
      globalScores[activePlayer] = 0;
      globalScoreDisplays[activePlayer].innerHTML = '0';
      changeActivePlayer();
    } else {
      // If player rolls one 1, he loses current score
      if (dice1RollValue === 1 || dice2RollValue === 1) {
        changeActivePlayer();
      } else {
        roundScore += (dice1RollValue + dice2RollValue);
        roundScoreDisplays[activePlayer].innerHTML = roundScore;
      }
    }
  }
}, false)

// Hold points
holdBtn.addEventListener('click', function() {
  if (gamePlaying) {
    // Add round score to global score
    globalScores[activePlayer] += roundScore;
    globalScoreDisplays[activePlayer].innerHTML = globalScores[activePlayer];
    // Set round score to 0
    roundScore = 0;
    roundScoreDisplays[activePlayer].innerHTML = '0';
    // Unless player won the game, change player
    if (globalScores[activePlayer] < winningScore) {
      changeActivePlayer();
    } else {
      endGame(activePlayer);
    }
  }
}, false)

// Start new game
newGameBtn.addEventListener('click', init, false)


// FUNCTIONS
// Initialize game (DRY)
function init() {
  winningScoreInput.style.display = 'block';
  globalScores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  globalScoreDisplays[0].innerHTML = '0';
  globalScoreDisplays[1].innerHTML = '0';
  roundScoreDisplays[0].innerHTML = '0';
  roundScoreDisplays[1].innerHTML = '0';
  dice1DOM.style.display = 'none';
  dice2DOM.style.display = 'none';

  player1PanelClasses.remove("active");
  player2PanelClasses.remove("active");
  player1PanelClasses.add("active");

  // Undo winner effects
  document.querySelector("#name-0").innerHTML = "PLAYER 1";
  document.querySelector("#name-1").innerHTML = "PLAYER 2";
  player1PanelClasses.remove("winner");
  player2PanelClasses.remove("winner");

  // Submit winning score
  submitBtn.addEventListener('click', function() {
    winningScore = document.querySelector(".winningScoreInput input").value;
    if (winningScore >= 20) {
      winningScoreInput.style.display = 'none';
      gamePlaying = true;
    } else {
      alert('Sorry, the winning score must be at least 10!')
    }
  }, false)
}



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
  // Change state variable
  gamePlaying = false;
  // Add winner class
  var winnerPanel = document.querySelector('.player-' + activePlayer + '-panel')
  var winnerClasses = winnerPanel.classList;
  winnerClasses.add("winner");
  winnerClasses.remove("active");
  // Announce winner
  document.querySelector("#name-" + activePlayer).innerHTML = "WINNER!!!";
}