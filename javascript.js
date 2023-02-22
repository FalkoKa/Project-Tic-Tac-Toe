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

const fields = document.querySelectorAll('.field');
const btnRestart = document.querySelector('button');
const messageElement = document.querySelector('.message');

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
      messageElement.textContent = `Player ${result} won!`;
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
    gameLogic[player].indices.push(index);

    gameboard.setField(index, sign);
    domManipulation.renderMark(index, sign);
    gameLogic.playRound(index);
  },
};

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

  playRound() {
    if (gameLogic.round === 8) {
      domManipulation.announceResult('draw');
      gameLogic.gameover = true;
      return;
    }

    if (gameLogic.checkWincondition()) {
      domManipulation.announceResult(gameLogic.getTurn());
      gameLogic.gameover = true;
    }

    gameLogic.round++;
    domManipulation.announceMessage(
      `It's Player ${gameLogic.getTurn()}'s turn`
    );
  },

  checkWincondition() {
    const playerX = gameLogic.playerX.indices;
    const playerO = gameLogic.playerO.indices;
    const winconditions = [
      [0, 1, 3],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 6],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // if playerX.indices or playerY.indices match any combination of winconditions
    // then win = true
    // else win = false
    // return win;
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
  domManipulation.announceMessage(`It's Player X's turn`);
});
