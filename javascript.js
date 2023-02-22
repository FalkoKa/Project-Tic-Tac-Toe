const playerX = {
  sign: X,
};

const gameboard = {
  gameboard: ['', '', '', '', '', '', '', '', ''],
};

const fields = document.querySelectorAll('.field');

fields.forEach((field) => {
  field.addEventListener('click', handleClick);
});

function handleClick(event) {
  console.log(event.target.dataset.num);
}
