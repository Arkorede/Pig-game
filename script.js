'use strict';

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

/*function btn() {
  // Do something here
}*/

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var secondDice = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    var secondDiceDOM = document.querySelector('.second-dice');
    secondDiceDOM.style.display = 'block';
    secondDiceDOM.src = 'dice-' + secondDice + '.png';

    // 3. Update the round score IF the rolled number was not a 1

    if (dice === 6 && lastDice === 6) {
      // Player losses score
      scores[activePlayer] = 0;
      document.querySelector('#score--' + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice !== 1 && secondDice !== 1) {
      // Add score
      roundScore += dice;
      roundScore += secondDice;
      // roundScore = roundScore + dice;
      document.querySelector('#current--' + activePlayer).textContent =
        roundScore;
    } else {
      // Next player
      nextPlayer();
    }

    lastDice = dice;
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // scores[activePlayer] = scores[activePlayer] + roundScore;
    // Update the UI
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;

    //  undefined, 0, null or '' are COERCED to false
    // Anything else is COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.second-dice').style.display = 'none';
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');
      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('active');
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  /*same as 
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }*/
  roundScore = 0;

  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');

  // document.querySelector('.player--0').classList.remove('player--active');
  // document.querySelector('.player--1').classList.add('player--active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.second-dice').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.second-dice').style.display = 'none';

  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
}

// document.querySelector('#current--' + activePlayer).textContent = dice;
// document.querySelector('#current--' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score--0').textContent;
