const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const units = {
    'hour': ['час', 'часа', 'часов'],
    'minute': ['минута', 'минуты', 'минут'],
    'second': ['секунда', 'секунды', 'секунд']
};
const formatTime = (time, units) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const hoursStr = formatUnit(hours, units['hour']);
    const minutesStr = formatUnit(minutes, units['minute']);
    const secondsStr = formatUnit(seconds, units['second']);

    return `${hoursStr} ${minutesStr} ${secondsStr}`;
};
const formatUnit = (value, unit) => {
    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return `${value} ${unit[0]}`;
    } else if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
        return `${value} ${unit[1]}`;
    } else {
        return `${value} ${unit[2]}`;
    }
};
const validateInput = (input) => {
    const hasUpper = /[A-ZА-ЯЁ]/.test(input);
    const hasLower = /[a-z-а-яё]/.test(input);
    const hasSymbol = /[!@#$%&*]/.test(input);
    return !(hasUpper || hasLower || hasSymbol);
};
const animateTimer = (seconds) => {
        let timer = seconds;
        let timerId = setInterval(() => {
            timerEl.textContent = formatTime(timer, units);
            if (--timer < 0) {
                timer = seconds;
            }
            if (!timer) clearInterval(timerId)
        }, 1000,);
};

inputEl.addEventListener('input', () => {
    if (!validateInput(inputEl.value)) {
        alert('Введите только цифры!');
        inputEl.value = '';
    }
});
buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);
    animateTimer(seconds)
    inputEl.value = '';
});
