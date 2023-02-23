// DOM ELEMENTS
const fields = document.querySelectorAll('.field');
const btnRestart = document.querySelector('button');
const messageElement = document.querySelector('.message');
const colorPicker = document.querySelector('input');
const span = document.querySelector('.name-span');
const scoreElement = document.querySelector('.score');
const audioPlayerX = new Audio('./sounds/blop.wav');
const audioPlayerY = new Audio('./sounds/blub.mp3');

// GAMEBORD
const gameboard = {
  board: ['', '', '', '', '', '', '', '', ''],

  setField(index, sign) {
    gameboard.board[index] = sign;
  },

  reset() {
    for (let i = 0; i < gameboard.board.length; i++) {
      gameboard.board[i] = '';
    }
  },
};

// UI
const domManipulation = {
  renderMark(index, sign) {
    const span = document.createElement('span');
    span.textContent = sign;
    span.classList.add('animate__animated');
    span.classList.add('animate__bounce');
    fields[index].append(span);
  },

  resetFields() {
    fields.forEach((field) => {
      field.textContent = '';
    });
  },

  announceResult(result) {
    if (result === 'draw') {
      messageElement.textContent = `It's a draw!`;
    } else {
      messageElement.textContent = `${result} won!`;
    }
  },

  announceMessage(message) {
    messageElement.textContent = message;
  },

  handleClick(event) {
    if (gameLogic.getGameStatus() || event.target.textContent !== '') return;

    let index = Number(event.target.dataset.num);
    let sign = gameLogic.getTurn();
    let player = `player${sign}`;
    let symbol = gameLogic.getSymbol();

    // check turn to play sound
    if (sign === 'X') {
      audioPlayerX.play();
    } else {
      audioPlayerY.play();
    }
    gameLogic[player].indices.push(index);
    gameboard.setField(index, sign);
    domManipulation.renderMark(index, symbol);
    gameLogic.playRound(index);
  },
};

// GAME LOGIC
const gameLogic = {
  gameover: false,
  round: 0,

  playerX: {
    name: 'Player X',
    sign: 'X',
    symbol: '🍔',
    indices: [],
    score: 0,
  },

  playerO: {
    name: 'Player O',
    sign: 'O',
    symbol: '🍇',
    indices: [],
    score: 0,
  },

  getTurn() {
    if (gameLogic.round % 2 === 0) {
      return gameLogic.playerX.sign;
    } else {
      return gameLogic.playerO.sign;
    }
  },

  getName() {
    if (gameLogic.round % 2 === 0) {
      return gameLogic.playerX.name;
    } else {
      return gameLogic.playerO.name;
    }
  },

  getSymbol() {
    if (gameLogic.round % 2 === 0) {
      return gameLogic.playerX.symbol;
    } else {
      return gameLogic.playerO.symbol;
    }
  },

  updateScore(player) {
    if (player === 'X') {
      gameLogic.playerX.score++;
    } else {
      gameLogic.playerO.score++;
    }
    scoreElement.textContent = `${gameLogic.playerX.score} - ${gameLogic.playerO.score} `;
  },

  playRound() {
    if (gameLogic.checkWincondition()) {
      domManipulation.announceResult(gameLogic.getName());
      gameLogic.updateScore(gameLogic.getTurn());
      gameLogic.gameover = true;
      return;
    } else if (gameLogic.round === 8) {
      domManipulation.announceResult('draw');
      gameLogic.gameover = true;
      return;
    }

    gameLogic.round++;
    domManipulation.announceMessage(`It's ${gameLogic.getName()}'s turn`);
  },

  checkWincondition() {
    let win = false;
    const playerX = gameLogic.playerX.indices;
    const playerO = gameLogic.playerO.indices;
    const winconditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // every element of wincon[i] is included in player.indices ? win -> true : false
    for (let i = 0; i < winconditions.length; i++) {
      if (
        winconditions[i].every((element) => {
          return playerX.includes(element);
        }) ||
        winconditions[i].every((element) => {
          return playerO.includes(element);
        })
      ) {
        return (win = true);
      } else {
        win = false;
      }
    }
    return win;
  },

  getGameStatus() {
    return gameLogic.gameover;
  },

  reset() {
    gameLogic.round = 0;
    gameLogic.gameover = false;
    gameLogic.playerX.indices = [];
    gameLogic.playerO.indices = [];
  },
};

fields.forEach((field) => {
  field.addEventListener('click', domManipulation.handleClick);
});

btnRestart.addEventListener('click', () => {
  console.log('... restarting');
  gameLogic.reset();
  gameboard.reset();
  domManipulation.resetFields();
  domManipulation.announceMessage(
    `New GAME! It's ${gameLogic.playerX.name}'s turn`
  );
});

colorPicker.addEventListener('input', (e) => {
  // btnRestart.style.cssText = `color: rgba(${randomRGB()}, 1); background-color: rgba(${randomRGB()}, 1);`;
  document.body.style.backgroundColor = e.target.value;
  fields.forEach((field) => {
    field.style.cssText = `background-color: ${e.target.value};`;
  });
});

function randomRGB() {
  const randomR = Math.floor(Math.random() * 250);
  const randomG = Math.floor(Math.random() * 250);
  const randomB = Math.floor(Math.random() * 250);
  return `${randomR}, ${randomG}, ${randomB}`;
  return Math.floor(Math.random() * 250);
}

// INITIALIZE GAME
span.textContent = gameLogic.getName();

// event listener pageload
// initially main content display = none
// show form to enter names
// event listener submit -> main display: block, form display none
