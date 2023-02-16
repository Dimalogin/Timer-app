import { arrayComponents } from "./arrayComponents.js";
import { createComponents } from "./createComponents.js";

import { draggingUp } from "./dragging.js";
import { draggingDown } from "./dragging.js";

export class TimerSwitch {
  timer = document.querySelector(".timer");

  hours = this.timer.querySelector(".hours-component");
  hoursBtnUp = this.timer.querySelector(".hours-button__up");
  hoursBtnDown = this.timer.querySelector(".hours-button__down");

  minutes = this.timer.querySelector(".minutes-component");
  minutesBtnUp = this.timer.querySelector(".minutes-button__up");
  minutesBtnDown = this.timer.querySelector(".minutes-button__down");

  seconds = this.timer.querySelector(".seconds-component");
  secondsBtnUp = this.timer.querySelector(".seconds-button__up");
  secondsBtnDown = this.timer.querySelector(".seconds-button__down");

  handler(event) {
    if (event.target === this.hoursBtnUp) {
      this.draggingElementUp(event);
    } else if (event.target === this.hoursBtnDown) {
      this.draggingElementDown(event);
    } else if (event.target === this.minutesBtnUp) {
      this.draggingElementUp(event);
    } else if (event.target === this.minutesBtnDown) {
      this.draggingElementDown(event);
    } else if (event.target === this.secondsBtnUp) {
      this.draggingElementUp(event);
    } else if (event.target === this.secondsBtnDown) {
      this.draggingElementDown(event);
    }
  }

  constructor() {
    this.hoursBtnUp.addEventListener("click", this.handler.bind(this));
    this.hoursBtnDown.addEventListener("click", this.handler.bind(this));
    this.minutesBtnUp.addEventListener("click", this.handler.bind(this));
    this.minutesBtnDown.addEventListener("click", this.handler.bind(this));
    this.secondsBtnUp.addEventListener("click", this.handler.bind(this));
    this.secondsBtnDown.addEventListener("click", this.handler.bind(this));

    this.renderComponent();
  }

  renderComponent() {
    this.hours.appendChild(createComponents(arrayComponents));
    this.minutes.appendChild(createComponents(arrayComponents));
    this.seconds.appendChild(createComponents(arrayComponents));
  }

  draggingElementUp(event) {
    const parentElement = event.target.parentElement.parentElement;
    draggingUp(parentElement);
  }

  draggingElementDown(event) {
    const parentElement = event.target.parentElement.parentElement;
    draggingDown(parentElement);
  }
}
