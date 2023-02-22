// DOM ELEMENTS
const fields = document.querySelectorAll('.field');
const btnRestart = document.querySelector('button');
const messageElement = document.querySelector('.message');
const span = document.querySelector('span');
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
    fields[index].textContent = sign;
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

    // check turn to play sound
    if (sign === 'X') {
      audioPlayerX.play();
    } else {
      audioPlayerY.play();
    }

    gameLogic[player].indices.push(index);
    gameboard.setField(index, sign);
    domManipulation.renderMark(index, sign);
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
    indices: [],
  },

  playerO: {
    name: 'Player O',
    sign: 'O',
    indices: [],
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

  playRound() {
    if (gameLogic.checkWincondition()) {
      domManipulation.announceResult(gameLogic.getName());
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

// INITIALIZE GAME
span.textContent = gameLogic.getName();
