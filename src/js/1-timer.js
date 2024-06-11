import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

let userDate;

let timerInterval;
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
    userSet(selectedDates[0]);
  },
});
function timer() {
  refs.dataStart.setAttribute('disabled', '');
  refs.picker.setAttribute('disabled', '');
  const novDate = new Date();

  let intervalId;
  let timerInterval = userDate - novDate;

  intervalId = setInterval(() => {
    timerWriter(convertMs(timerInterval));
    timerInterval -= 1000;
    if (timerInterval <= 0) {
      clearInterval(intervalId);
      stop();
    }
    console.log(timerInterval);
  }, 1000);
}

function userSet(userData) {
  const novDate = new Date();

  if (novDate > userData) {
    console.log('Future time');

    iziToast.error({
      title: 'Error',
      message: 'Illegal operation',
    });
    stop();
    return;
  }
  start(userData);
}
function start(userData) {
  refs.dataStart.removeAttribute('disabled');
  refs.dataStart.addEventListener('click', timer);
  userDate = userData;
}

function stop() {
  refs.dataStart.removeEventListener('click', timer);
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

function timerWriter(time) {
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
