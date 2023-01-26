
const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};
let timerId = null;
const INTERVAL_DELAY = 1000;

refs.stopBtn.disabled = true;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonSwitch = () =>
  (refs.stopBtn.disabled = !(refs.startBtn.disabled = !refs.startBtn.disabled));

const startSwith = () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_DELAY);
  buttonSwitch();
};

const stopSwitch = () => {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
  buttonSwitch();
};

refs.startBtn.addEventListener('click', startSwith);
refs.stopBtn.addEventListener('click', stopSwitch);

