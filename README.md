# README

[Live Link](https://falkoka.github.io/Project-Tic-Tac-Toe/)

## Technologies used

- HTML
- CSS
- JAVASCRIPT

## Implementation Ideas

- color picker for background theme
- add player names
- keep track of multiple game rounds with a win counter
- add local storage
- add sound ✅
- add emojies instead of X and O 🍔
- add animations ✅

## PSEUDOCODE

### Player object

- Have a player for X and a player for O

### Gameboard object

- empty array with one element for each field of the gameboard -> 9 elements
- setField -> assign the index of field with the sympol to the gameboard array
- reset function to set each element of the array back to ""

### DOM object controller

- selector

  - divs(fields)
  - message field
  - restart button

- function render marks(playersign?)

- function announceWinner

- function announceMessage(message)

- function resetField

- function handleClick

  - if gameover || textContent in the field -> return
  - call setField function with index and sign
  - call renderMark
  - call play function

- function restartGame

  - call gameboard reset function
  - call game reset function
  - call DOM reset function
  - announce message turn

- add eventlistener
  - click on field -> handleClick (forEach div)
  - click on restartButton -> restart

### gamelogic object

- Player X
  - name, sign indices
- Player O
  - name, sign, indices
- gameOver = false
- round = 0

- function playerTurn

  - if round odd => playerX, else playerY

- playRound function

  - if round === 8
  - gameOver = true
  - display message result = (draw)
  - else if checkGameover true
    - gameOver = true
    - display message result = (winner) X || Y
  - else
    - gameover false
    - round ++
    - display message announce turn

- checkGameOver() function

  - winconditions
    8 winconditions?
  - if any combo matches the indices of any player, return win = true

- getGameOver function -> return gameover (false or true)

- reset function
  - gameover false
  - round = 0
