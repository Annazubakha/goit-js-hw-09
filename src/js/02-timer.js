import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  dateTimePicker: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysCounter: document.querySelector('[data-days]'),
  hoursCounter: document.querySelector('[data-hours]'),
  minutesCounter: document.querySelector('[data-minutes]'),
  secondsCounter: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
};
let intervalId = null;
let selectedDate = null;
refs.startBtn.setAttribute('disabled', '');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const delta = selectedDates[0] - new Date();
    selectedDate = selectedDates[0];
    if (delta <= 0) {
      refs.startBtn.setAttribute('disabled', '');
      Notify.failure('Please choose a date in the future');
      return;
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};
flatpickr(refs.dateTimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.startBtn.setAttribute('disabled', '');
  intervalId = setInterval(() => {
    const delta = selectedDate - new Date();
    if (delta <= 0) {
      clearInterval(intervalId);
      return;
    }
    const date = convertMs(delta);
    updateTextContent(date);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function updateTextContent(date) {
  Object.entries(date).forEach(([, value], index) => {
    refs.timer.children[index].firstElementChild.textContent =
      addLeadingZero(value);
  });
}
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
