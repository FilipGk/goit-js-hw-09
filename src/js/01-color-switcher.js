const startBtn = document.querySelector(`[data-start]`);
const stopBtn = document.querySelector(`[data-stop]`);

let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startColorChange() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timer);
}

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);
