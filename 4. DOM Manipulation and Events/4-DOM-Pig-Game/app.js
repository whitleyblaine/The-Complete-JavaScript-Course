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
var globalScoreDisplays = document.getElementsByClassName('player-score');
var roundScoreDisplays = document.getElementsByClassName('player-current-score');

// To toggle active class
var player1PanelClasses = document.querySelector(".player-0-panel").classList;
var player2PanelClasses = document.querySelector(".player-1-panel").classList;

var diceDOM = document.querySelector('.dice');

var globalScores, roundScore, activePlayer, previousRoll;

// State variable
var gamePlaying;

init();

// Roll dice
rollBtn.addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Random number
    var diceRollValue = Math.ceil(Math.random() * 6);

    // 2. Display the result
    diceDOM.style.display = 'block';
    diceDOM.src = "dice-" + diceRollValue + ".png";

    // 3. Update the round score IF the rolled number was NOT a 1
    if (diceRollValue !== 1) {
      // If player rolls two 6's in a row, he loses global score
      if (previousRoll === 6 && diceRollValue === 6) {
        globalScores[activePlayer] = 0;
        globalScoreDisplays[activePlayer].innerHTML = '0';
        changeActivePlayer();
      } else {
        roundScore += diceRollValue;
        roundScoreDisplays[activePlayer].innerHTML = roundScore;
        previousRoll = diceRollValue;
      }
    } else {
      changeActivePlayer();
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
    // Set previous roll to 0
    previousRoll = 0;
    // Unless player won the game, change player
    if (globalScores[activePlayer] < 20) {
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
  gamePlaying = true;
  globalScores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  globalScoreDisplays[0].innerHTML = '0';
  globalScoreDisplays[1].innerHTML = '0';
  roundScoreDisplays[0].innerHTML = '0';
  roundScoreDisplays[1].innerHTML = '0';
  diceDOM.style.display = 'none';

  player1PanelClasses.remove("active");
  player2PanelClasses.remove("active");
  player1PanelClasses.add("active");

  // Undo winner effects
  document.querySelector("#name-0").innerHTML = "PLAYER 1";
  document.querySelector("#name-1").innerHTML = "PLAYER 2";
  player1PanelClasses.remove("winner");
  player2PanelClasses.remove("winner");
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