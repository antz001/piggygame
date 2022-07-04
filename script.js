'use strict';

//Selecting elements
const scoreOne = document.querySelector('#score--0');
const scoreTwo = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const current1 = document.getElementById('current--0');
const current2 = document.getElementById('current--1');

//Initial conditions

let scores;
let currentScore;
let activePlayer; //Player1 = 0 & Player2 = 1
let playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; //Player1 = 0 & Player2 = 1
  playing = true;

  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;
  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    //creating the random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //showing the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch the player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current scrore to global score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if score is 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //3. switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

//function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};
