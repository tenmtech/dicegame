'use strict';

//Comment -->  Select DOM elements
const player1El = document.querySelector('.player--1');
const player0El = document.querySelector('.player--0');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;

//Comment --> Conditiile de start ale jocului
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//Comment --> schimbare player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Comment --> Functionalitatea aruncarii zarului
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Comment --> 1. Generam un numar de zar random
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //Comment --> 2. afisam zarul
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Comment --> 3. Daca zarul dat este 1 , ne mutam la urmatorul player
    if (dice !== 1) {
      //Comment --> adaugam zarul la scorul curent
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Comment --> add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Comment --> check score if  >=100
    //Comment --> finish the game if it is
    //Comment --> switch to the other player if not
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//Comment --> reinitializare conditii pentru noul joc
btnNew.addEventListener('click', function () {
  init();
});
