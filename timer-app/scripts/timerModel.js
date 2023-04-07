import { TimerViewSwitcher } from "./timer-switch/timerViewSwitcher.js";

import { TimerViewDisplay } from "./timer-display/timerVeiwDisplay.js";

export class TimerModel {
  TimerViewSwitcher = new TimerViewSwitcher();
  TimerViewDisplay = new TimerViewDisplay();

  renderTimerSwitch() {
    if (this.TimerViewDisplay.idRef) {
      cancelAnimationFrame(this.TimerViewDisplay.idRef);
    }

    this.TimerViewSwitcher.renderTemplate();
    this.TimerViewSwitcher.searchElementsArrows();
    this.TimerViewSwitcher.createHandlersArrows();
    this.TimerViewSwitcher.searchComponentsForSwitcher();
    this.TimerViewSwitcher.createComponentsForSwitcher();
  }

  renderTimerDisplay(time) {
    this.TimerViewDisplay.initCurrentTime(time);
    this.TimerViewDisplay.renderTemplate();
    this.TimerViewDisplay.searchElementsDisplay();
    this.TimerViewDisplay.createHandlerDisplay();
    this.TimerViewDisplay.startTimer();
  }
}