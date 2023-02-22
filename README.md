# README

Live Link

## Technologies used

- HTML
- CSS
- JAVASCRIPT

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
- Player O
- gameOver = false
- round = 1

- function playerTurn

  - if round odd => playerX, else playerY

- checkGameOver(player, index) function

  - winconditions from array
    8 winconditions?
    - if round === 9
      - gameOver = true
      - display message result = (draw)
    - else if wincondition true (index)
      - gameOver = true
      - display message result = (winner) X || Y
    - else
      - gameover false
      - round ++
      - display message announce turn

- getGameOver function -> return gameover (false or true)

- reset function
  - gameover false
  - round = 1
