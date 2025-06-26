import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const inputEL = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('[data-start]')
const days = document.querySelector('[data-days]')
const hours = document.querySelector('[data-hours]')
const minutes = document.querySelector('[data-minutes]')
const seconds = document.querySelector('[data-seconds]')
let userSelectedDate = null
startBtn.disabled = true

flatpickr(inputEL, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime()


        if (userSelectedDate < Date.now()) {
            alert("Please choose a date in the future")
            startBtn.disabled = true
        } else {
            startBtn.disabled = false
        }

        startBtn.addEventListener('click', () => {
            setInterval(() => {
                const curDate = Date.now()
                const delta = userSelectedDate - curDate
                console.log(convertMs(delta))
                days.textContent = addLeadingZero((convertMs(delta).days).toString())               
                hours.textContent = addLeadingZero((convertMs(delta).hours).toString())
                minutes.textContent = addLeadingZero((convertMs(delta).minutes).toString())
                seconds.textContent = addLeadingZero((convertMs(delta).seconds).toString())
            }, 1000)
        })
        function addLeadingZero(value) {
            return value.padStart(2, '0')
        }
    },
});

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

