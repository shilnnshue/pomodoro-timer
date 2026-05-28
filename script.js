let timerInterval;
let timeLeft = 25 * 60;
let isRunning = false;
let isWorkSession = true;
let completedPomodoros = 0;

let workTime = 25;
let breakTime = 5;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const completedDisplay = document.getElementById('completed');
const modeDisplay = document.getElementById('mode');

const workInput = document.getElementById('work-time');
const breakInput = document.getElementById('break-time');
const applyBtn = document.getElementById('apply-settings');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            if (isWorkSession) {
                completedPomodoros++;
                completedDisplay.textContent = completedPomodoros;
                timeLeft = breakTime * 60;
                isWorkSession = false;
                modeDisplay.textContent = '休息';
                alert('工作时间结束！该休息啦 🍅');
            } else {
                timeLeft = workTime * 60;
                isWorkSession = true;
                modeDisplay.textContent = '工作';
                alert('休息结束！开始下一个番茄吧！');
            }
            updateDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    pauseTimer();
    isWorkSession = true;
    timeLeft = workTime * 60;
    modeDisplay.textContent = '工作';
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

applyBtn.addEventListener('click', () => {
    workTime = parseInt(workInput.value) || 25;
    breakTime = parseInt(breakInput.value) || 5;
    resetTimer();
});

// 初始化
updateDisplay();