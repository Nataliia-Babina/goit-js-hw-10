
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

let userDate;

const refs = {
  picker: document.querySelector('#datetime-picker'),
  dataStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userValue(selectedDates[0]);
  },
});

function getTime() {
  refs.dataStart.setAttribute('disabled', '');
  refs.picker.setAttribute('disabled', '');
  const getDate = new Date();

  let intervalId;
  let timerInterval = userDate - getDate;

  intervalId = setInterval(() => {
    timerBegin(convertMs(timerInterval));
    timerInterval -= 1000;
    if (timerInterval <= 0) {
      clearInterval(intervalId);
      stop();
    }
    console.log(timerInterval);
  }, 1000);
}

function userValue(userData) {
  const getDate = new Date();

  if (getDate > userData) {
    window.alert("Please choose a date in the future");
    stopTime();    
  }
  startTime(userData);
}
function startTime(userData) {
  refs.dataStart.removeAttribute('disabled');
  refs.dataStart.addEventListener('click', getTime);
  userDate = userData;
}

function stopTime() {
  refs.dataStart.removeEventListener('click', getTime);
  refs.dataStart.setAttribute('disabled', '');
  refs.picker.removeAttribute('disabled');
  userDate = null;
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

function timerBegin(time) {
  console.log(time);
  console.log(time.seconds);
  let days = time.days;
  let hours = time.hours;
  let minutes = time.minutes;
  let seconds = time.seconds;

  refs.days.textContent = days.toString().padStart(2, '0');
  refs.hours.textContent = hours.toString().padStart(2, '0');
  refs.minutes.textContent = minutes.toString().padStart(2, '0');
  refs.seconds.textContent = seconds.toString().padStart(2, '0');
}