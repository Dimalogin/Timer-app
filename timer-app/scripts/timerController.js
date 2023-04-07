import { TimerModel } from "./timerModel.js";

export class TimerController {
  TimerModel = new TimerModel();

  timer = document.querySelector(".timer");

  startTimerBtn = this.timer.querySelector("#onStart");
  resetTimerBtn = this.timer.querySelector("#onReset");
  onPauseBtn = this.timer.querySelector("#onPause");
  start = true;

  handler(event) {
    if (this.start) {
      this.TimerModel.renderTimerSwitch();
      this.start = !this.start;
    } else {
      if (this.startTimerBtn === event.target) {
        const setTime = this.getTimeOnSwitch();
        if (setTime > 0) {
          this.TimerModel.renderTimerDisplay(setTime);
          this.startTimerBtn.style.display = "none";
          this.resetTimerBtn.style.display = "block";
          this.onPauseBtn.style.display = "block";
        }
      } else if (this.resetTimerBtn === event.target) {
        window.location.reload();
        this.startTimerBtn.style.display = "block";
        this.resetTimerBtn.style.display = "none";
        this.onPauseBtn.style.display = "none";
      }
    }
  }

  constructor() {
    this.startTimerBtn.addEventListener("click", this.handler.bind(this));
    this.resetTimerBtn.addEventListener("click", this.handler.bind(this));
    this.handler();
  }

  getTimeOnSwitch() {
    const hoursComponent = this.timer.querySelector(".hours-component");
    const minutesComponent = this.timer.querySelector(".minutes-component");
    const secondsComponent = this.timer.querySelector(".seconds-component");

    const hoursComponents =
      hoursComponent.querySelectorAll(".single-component");
    const minutesComponents =
      minutesComponent.querySelectorAll(".single-component");
    const secondsComponents =
      secondsComponent.querySelectorAll(".single-component");

    const h = hoursComponents[2].textContent;
    const m = minutesComponents[2].textContent;
    const s = secondsComponents[2].textContent;

    return Number(h) * 3600000 + Number(m) * 60000 + Number(s) * 1000;
  }
}