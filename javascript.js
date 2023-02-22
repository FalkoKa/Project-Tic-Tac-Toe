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
    let index = event.target.dataset.num;
    console.log(index);
    gameLogic.playRound();
    domManipulation.renderMark(index, 'X');
  },
};

const gameLogic = {
  gameover: false,
  round: 1,

  playerX: {
    name: 'Player X',
    sign: 'X',
  },

  playerY: {
    name: 'Player Y',
    sign: 'Y',
  },

  getTurn(round) {
    if (round % 2 === 1) {
      return gameLogic.playerX.sign;
    } else {
      return gameLogic.playerY.sign;
    }
  },

  playRound() {
    gameLogic.round++;
    console.log(gameLogic.round);
    return gameLogic.getTurn(gameLogic.round);
  },

  checkWincondition() {},

  getGameStatus() {
    return gameLogic.gameover;
  },

  reset() {
    gameLogic.round = 0;
    gameLogic.gameover = false;
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
