import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector(`[data-start]`);
const timer = document.querySelector('.timer');
const dayValue = timer.querySelector(`[data-days]`);
const hourValue = timer.querySelector(`[data-hours]`);
const minuteValue = timer.querySelector(`[data-minutes]`);
const secondValue = timer.querySelector(`[data-seconds]`);
let selectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 800,
      });
      {
      }
      return;
    } else {
      Notiflix.Notify.success('You have chosen the right date.', {
        timeout: 800,
      });
      startBtn.disabled = false;
    }
  },
};

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    dayValue.textContent = addLeadingZero(convertMs().days);
    hourValue.textContent = addLeadingZero(convertMs().hours);
    minuteValue.textContent = addLeadingZero(convertMs().minutes);
    secondValue.textContent = addLeadingZero(convertMs().seconds);
  }, 1000);
});

function convertMs() {
  const now = new Date().getTime();
  const userPick = selectedDate.getTime();
  const ms = userPick - now;
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  1;

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

flatpickr(datePicker, options);
