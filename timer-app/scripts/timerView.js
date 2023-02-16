import { templateSwitchDisplay } from "./templates/templateSwitchDisplay.js";
import { templateSwitchTimer } from "./templates/templateSwitchTimer.js";

import { TimerSwitch } from "./timer-switch/timerSwitch.js";
import { TimerDisplay } from "./timer-display/timerDisplay.js";

export class TimerVeiw {
  TimerDisplay;
  timer = document.querySelector(".timer");
  timerWindow = this.timer.querySelector(".timer__window");
  onTriggerBtn = this.timer.querySelector("#onTrigger");
  onPauseBtn = this.timer.querySelector("#onPause");
  renderWindow = true;

  onTrigger() {
    if (this.renderWindow) {
      this.timerWindow.innerHTML = templateSwitchTimer;
      new TimerSwitch();
      this.renderWindow = !this.renderWindow;
      this.onTriggerBtn.textContent = "Start";
      this.onPauseBtn.style.display = "none";

      if (this.TimerDisplay) {
        cancelAnimationFrame(this.TimerDisplay.idRef);
      }
    } else {
      const checkTime = this.getCurrentSwitchTime();
      const setTime = this.transformTime(checkTime);
      if (setTime > 0) {
        this.timerWindow.innerHTML = templateSwitchDisplay;
        this.TimerDisplay = new TimerDisplay(setTime);
        this.renderWindow = !this.renderWindow;
        this.onTriggerBtn.textContent = "Reset";
      }
    }
  }

  constructor() {
    this.onTriggerBtn.addEventListener("click", this.onTrigger.bind(this));
    this.onTrigger();
  }

  transformTime(time) {
    const [h, m, s] = time;
    return Number(h) * 3600000 + Number(m) * 60000 + Number(s) * 1000;
  }

  getCurrentSwitchTime() {
    const hoursComponent = this.timer.querySelector(".hours-component");
    const minutesComponent = this.timer.querySelector(".minutes-component");
    const secondsComponent = this.timer.querySelector(".seconds-component");

    const hoursComponents =
      hoursComponent.querySelectorAll(".single-component");
    const minutesComponents =
      minutesComponent.querySelectorAll(".single-component");
    const secondsComponents =
      secondsComponent.querySelectorAll(".single-component");

    const hours = hoursComponents[2].textContent;
    const minutes = minutesComponents[2].textContent;
    const seconds = secondsComponents[2].textContent;

    return [hours, minutes, seconds];
  }
}
