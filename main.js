const form = document.querySelector('.form');
const timeMinutes = document.querySelector('.time-minutes');
const timeSeconds = document.querySelector('.time-seconds');
const format = document.querySelector("select[name='format']");
const setBtn = document.querySelector('.set-btn');
const countDown = document.querySelector('.countdown');
const stopBtn = document.querySelector('.stop-btn');
const stepBtn = document.querySelector('.step-btn');
const resetBtn = document.querySelector('.reset-btn');

const tbody = document.querySelector('tbody');


/* global variables and constants*/
const cycle = 17;
let countDownInterval;
let secondsLeftms;
let endTime;
let stopBtnClicked = false;
/* global variables ends */


/* .stop-btn click listener */
stopBtn.addEventListener('click', () => {
    stopBtnClicked = !stopBtnClicked;

    if (stopBtnClicked === true) {
        stopBtn.innerHTML = 'PLAY';
        stepBtn.disabled = true;
        resetBtn.disabled = false;

        clearInterval(countDownInterval);
    } else if (stopBtnClicked === false) {
        stopBtn.innerHTML = 'PAUSE';
        stepBtn.disabled = false;
        resetBtn.disabled = true;

        endTime = secondsLeftms + Date.now();
        countDownInterval = setInterval(() => {
            setCountDown(endTime);
        }, cycle);
    }
});
/* .stop-btn click listener ends */


stepBtn.addEventListener('click', () => {
    saveTime();
});


/* .reset-btn click listener */
resetBtn.addEventListener('click', () => {
    resetCountDown();
});
/* .reset-btn click listener ends */


/* .form submit listener */
form.addEventListener('submit', (event) => {
    event.preventDefault();

    let countDownTime = 0;

    countDownTime += timeMinutes.value * 60000;
    countDownTime += timeSeconds.value * 1000;

    const now = Date.now();
    endTime = now + countDownTime;  

    countDownInterval = setInterval(() => {
        setCountDown(endTime);
    }, cycle);

    setBtn.disabled = true;
    stepBtn.disabled = false;
    stopBtn.disabled = false;
});
/* .form submit listener ends */


/* setCountDown function */
const setCountDown = (endTime) => {
    secondsLeftms = endTime - Date.now();
    const secondsLeft = Math.floor(secondsLeftms / 1000);

    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;

    seconds = `0${seconds}`.substr(-2);
    minutes = `0${minutes}`.substr(-2);
    let ms = `00${secondsLeftms % 1000}`.substr(-3);

    if (secondsLeft < 0) {
        resetCountDown();
        return;
    }

    countDown.innerHTML = `${minutes}:${seconds}<span style="font-size: 0.4em;">.${ms}</span>`;

};
/* setCountDown function ends */


/* resetCountDown function */
const resetCountDown = () => {
    clearInterval(countDownInterval);
    countDown.innerHTML = '00:00<span style="font-size: 0.4em;">.000</span>';
    stopBtnClicked = false;
    stopBtn.innerHTML = 'PAUSE';
    tbody.innerHTML = "";

    setBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
};
/* resetCountDown function ends */

const saveTime = () => {
    const SEC = parseInt(secondsLeftms / 1000);
    let min = `0${parseInt(SEC / 60)}`.substr(-2);
    let sec = `0${SEC % 60}`.substr(-2);
    let ms = `00${secondsLeftms % 1000}`.substr(-3);

    let existed = tbody.childElementCount;

    let add = `<tr><td>${existed+1}</td><td>${min}:${sec}.${ms}</td></tr>`;

    tbody.insertAdjacentHTML("afterbegin", add);
}