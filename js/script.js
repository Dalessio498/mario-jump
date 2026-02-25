const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const ground = document.body;
const deathSound = new Audio('./sounds/super-mario-death.mp3');
const pointSound = new Audio('./sounds/pointSound.mp3');
const scoreElement = document.querySelector('.score');
const restartBtn = document.querySelector('.restart')

restartBtn.addEventListener('click', () => {
    location.reload();
})

let score = 0;
let scored = false;

const jump = () => {
  mario.classList.add('jump');
  setTimeout(() => mario.classList.remove('jump'), 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition < 0 && !scored) {
    score++;
    scoreElement.innerText = score;
    scored = true
    pointSound.play();
  }

  if (pipePosition > 300) {
    scored = false
  }

  if (pipePosition <= 120 && marioPosition <= 80 && pipePosition > 0) {
    deathSound.play();

    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    restartBtn.style.display = 'block';

    mario.style.bottom = `${marioPosition}px`;
    mario.style.setProperty('--mario-bottom', `${marioPosition}px`);
    mario.classList.add('mario-dead');

    mario.src = './images/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    ground.style.animation = 'none';

    clearInterval(loop);
  }
}, 10);

document.addEventListener('keydown', jump);

/*:D*/

