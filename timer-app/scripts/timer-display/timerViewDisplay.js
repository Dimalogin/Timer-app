import { formatTimeDuration } from "./formatTimeDuration.js";
import { templateSwitchDisplay } from "../templates/templateSwitchDisplay.js";

export class TimerViewDisplay {
  timer = document.querySelector(".timer");

  #timerWindow;
  #timerCircle;
  #resultTime;
  #timerSound;
  #completeWindow;
  #timerCompleteBtn;
  #onPauseBtn;

  #setTime;
  remainingTime;
  startTime;
  totalTime;
  idRef;
  lastTime;
  #firstStart = true;
  isPause = true;

  initCurrentTime(time) {
    this.#setTime = time;
  }

  renderTemplate() {
    const resultNode = this.timer.querySelector(".timer__window");
    resultNode.innerHTML = templateSwitchDisplay;
  }

  searchElementsDisplay() {
    this.#timerWindow = this.timer.querySelector(".timer__window");
    this.#timerCircle = this.timer.querySelector(".timer__circle");

    this.#completeWindow = this.timer.querySelector(".timer__complete-window");
    this.#timerCompleteBtn = this.timer.querySelector(
      ".complete-window__button"
    );

    this.#onPauseBtn = this.timer.querySelector("#onPause");

    this.#resultTime = this.timer.querySelector(".timer__time");
    this.#timerSound = new Audio("./audio/time-up.mp3");
  }

  createHandlerDisplay() {
    this.#timerCompleteBtn.addEventListener(
      "click",
      this.hideCompleteWindow.bind(this)
    );

    this.#onPauseBtn.addEventListener("click", this.onPause.bind(this));
  }

  startTimer() {
    this.getCurrentTime();
    this.renderCyrcle();
  }

  onTimer() {
    if (this.#firstStart) {
      this.totalTime = this.#setTime;
      const futureTime = this.startTime + this.#setTime;
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
    const components = this.#timerCircle.children;

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
      this.#resultTime.style.color = "red";
    }

    if (angle >= 360) {
      cancelAnimationFrame(this.idRef);
      components[0].style.display = "none";
      components[1].style.display = "none";
      components[2].style.display = "none";
      this.#resultTime.style.color = "#dddddd";
      this.showCompleteWindow();
      this.#timerSound.play();
      this.#timerSound.loop = true;
      this.#onPauseBtn.disabled = true;
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
    this.#resultTime.innerHTML = formatTimeDuration(time);
  }

  onPause() {
    if (this.isPause) {
      this.lastTime = this.remainingTime;
      this.isPause = !this.isPause;
      this.#firstStart = false;
      this.#onPauseBtn.textContent = "Continue";
      cancelAnimationFrame(this.idRef);
    } else {
      this.getCurrentTime();
      this.renderCyrcle();
      this.isPause = !this.isPause;
      this.#onPauseBtn.textContent = "Pause";
    }
  }

  showCompleteWindow() {
    this.#completeWindow.style.top = "10px";
  }

  hideCompleteWindow() {
    this.#completeWindow.style.top = "-80px";
    this.#timerSound.pause();
  }
}
