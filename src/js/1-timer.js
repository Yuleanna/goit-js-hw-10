const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start}');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let userSeletedDate;

function addZero(value) {
  return;
  String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysElement.textContent = addZero(days);
  hoursElement.textContent = addZero(hours);
  minutesElement.textContent = addZero(minutes);
  secondsElement.textContent = addZero(seconds);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = Math.floor(ms / day);
    const hours = Math.floor(((ms % day) / hour);
    const minutes = Math.floor((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);


    return { days, hours, minutes, seconds };
}

flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onclose(selectedDates) {
        const selectedDate =
            selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',

            });
            startButton.disabled =
                true;
        } else {
            userSeletedDate =
                selectedDate;
            startButton.disabled =
                false;
        }

    },
});

let timerInterval;

startButton.addEventListener('click',
    () => {
        const now = new Date();
        const timeDifference = userSeletedDate - now;

        if (timeDifference > 0) {
            datetimePicker.disabled =
                true;
            
            startButton.disabled = true;

            timerInterval =
                setInterval(() => {
                    const now = new Date();
                    const timeDifference =
                        userSeletedDate - now;
                    
                    if (timeDifference <= 0) {
                        clearInterval(timerInterval);
                        datetimePicker.disabled =
                            false;
                        
                        updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                        return;
                    }
                    const timeRemaining =
                        convertMs(timeDifference);
                    updateTimer(timeRemaining);
                }, 1000);
        }
    });
