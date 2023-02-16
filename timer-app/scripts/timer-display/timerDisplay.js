import { formatTimeDuration } from "./formatTimeDuration.js";
import { templateSwitchTimer } from "../templates/templateSwitchTimer.js";

export class TimerDisplay {
  setTime;
  remainingTime;
  startTime;
  totalTime;
  idRef;
  lastTime;
  firstStart = true;
  isPause = true;

  timer = document.querySelector(".timer");
  timerWindow = this.timer.querySelector(".timer__window");
  timerCircle = this.timer.querySelector(".timer__circle");

  completeWindow = this.timer.querySelector(".timer__complete-window");
  timerCompleteBtn = this.timer.querySelector(".complete-window__button");

  onPauseBtn = this.timer.querySelector("#onPause");

  resultTime = this.timer.querySelector(".timer__time");
  timerSound = new Audio("./audio/time-up.mp3");

  constructor(setTime) {
    this.setTime = setTime;
    this.lastTime = 0;
    this.startTime = 0;
    this.remainingTime = 0;
    this.onPauseBtn.style.display = "block";
    this.onPauseBtn.textContent = "Pause";
    this.onPauseBtn.addEventListener("click", this.onPause.bind(this));
    this.timerCompleteBtn.addEventListener(
      "click",
      this.hideCompleteWindow.bind(this)
    );
    this.onPauseBtn.disabled = false;
    this.renderTimer();
  }

  onReset() {
    this.timerWindow.innerHTML = templateSwitchTimer;
  }

  renderTimer() {
    this.getCurrentTime();
    this.renderCyrcle();
  }

  onPause() {
    if (this.isPause) {
      this.lastTime = this.remainingTime;
      this.isPause = !this.isPause;
      this.firstStart = false;
      this.onPauseBtn.textContent = "Continue";
      cancelAnimationFrame(this.idRef);
    } else {
      this.getCurrentTime();
      this.renderCyrcle();
      this.isPause = !this.isPause;
      this.onPauseBtn.textContent = "Pause";
    }
  }

  onTimer() {
    if (this.firstStart) {
      this.totalTime = this.setTime;
      const futureTime = this.startTime + this.setTime;
      const currentTime = Date.now();
      this.remainingTime = futureTime - currentTime;
      const angle = 360 - (this.remainingTime / this.totalTime) * 360;
      this.renderDisplayTimer(angle);
    } else {
      const futureTime = this.startTime + this.lastTime;
      const currentTime = Date.now();
      this.remainingTime = futureTime - currentTime;
      const angle = 360 - (this.remainingTime / this.totalTime) * 360;
      this.renderDisplayTimer(angle);
    }
  }

  renderDisplayTimer(angle) {
    const components = this.timerCircle.children;

    if (angle < 180) {
      components[0].style.transform = `rotate(${angle}deg)`;
      components[1].style.transform = `rotate(${angle}deg)`;
      components[2].style.display = "block";
    } else {
      components[0].style.transform = `rotate(180deg)`;
      components[1].style.transform = `rotate(${angle}deg)`;
      components[2].style.display = "none";
    }

    if (this.remainingTime <= 6000) {
      components[0].style.backgroundColor = "red";
      components[1].style.backgroundColor = "red";
      this.resultTime.style.color = "red";
    }

    if (angle >= 360) {
      cancelAnimationFrame(this.idRef);
      components[0].style.display = "none";
      components[1].style.display = "none";
      components[2].style.display = "none";
      this.resultTime.style.color = "#dddddd";
      this.showCompleteWindow();
      this.timerSound.play();
      this.timerSound.loop = true;
      this.onPauseBtn.disabled = true;
    }
  }

  getCurrentTime() {
    this.startTime = Date.now();
  }

  renderCyrcle() {
    this.idRef = requestAnimationFrame(() => {
      this.renderCyrcle();
      this.onTimer();
      this.renderTime(this.remainingTime);
    });
  }

  renderTime(time) {
    this.resultTime.innerHTML = formatTimeDuration(time);
  }

  showCompleteWindow() {
    this.completeWindow.style.top = "10px";
  }

  hideCompleteWindow() {
    this.completeWindow.style.top = "-80px";
    this.timerSound.pause();
  }
}
