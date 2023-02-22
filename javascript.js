const playerX = {
  sign: 'X',
};

const playerY = {
  sign: 'Y',
};

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

const domManipulation = {};

fields.forEach((field) => {
  field.addEventListener('click', handleClick);
});

function handleClick(event) {
  console.log(event.target.dataset.num);
}
