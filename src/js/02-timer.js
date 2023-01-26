import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  picker: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const pickedDate = new Date(selectedDates[0]);
    const nowDate = new Date(this.now);

    if (!(nowDate.getTime() < pickedDate.getTime())) {
      refs.start.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }

    refs.start.disabled = false;
  },
};

const flatPicker = flatpickr('#datetime-picker', options);

refs.picker.classList.add('timepicker');
refs.start.classList.add('startbtn');
refs.start.disabled = true;

refs.start.addEventListener('click', () => {
  const pickedTime = flatPicker.selectedDates[0].getTime();
  refs.start.disabled = true;

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const intervalTime = pickedTime - currentTime;

    if (intervalTime < 0) {
      clearInterval(intervalId);
      return;
    }

    refs.days.textContent = convertMs(intervalTime).days;
    refs.hours.textContent = convertMs(intervalTime).hours;
    refs.minutes.textContent = convertMs(intervalTime).minutes;
    refs.seconds.textContent = convertMs(intervalTime).seconds;
  }, 1000);
});

//  To dd:hh:mm:ss.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
