import { templateSwitchTimer } from "../templates/templateSwitchTimer.js";

import { arrayComponents } from "./arrayComponents.js";
import { createComponents } from "./createComponents.js";

import { draggingUp } from "./dragging.js";
import { draggingDown } from "./dragging.js";

export class TimerViewSwitcher {
  timer = document.querySelector(".timer");

  #hours;
  #minutes;
  #seconds;

  #hoursBtnUp;
  #hoursBtnDown;
  #minutesBtnUp;
  #minutesBtnDown;
  #secondsBtnUp;
  #secondsBtnDown;

  renderTemplate() {
    const resultNode = this.timer.querySelector(".timer__window");
    resultNode.innerHTML = templateSwitchTimer;
  }

  searchElementsArrows() {
    this.#hoursBtnUp = this.timer.querySelector(".hours-button__up");
    this.#hoursBtnDown = this.timer.querySelector(".hours-button__down");
    this.#minutesBtnUp = this.timer.querySelector(".minutes-button__up");
    this.#minutesBtnDown = this.timer.querySelector(".minutes-button__down");
    this.#secondsBtnUp = this.timer.querySelector(".seconds-button__up");
    this.#secondsBtnDown = this.timer.querySelector(".seconds-button__down");
  }

  createHandlersArrows() {
    this.#hoursBtnUp.addEventListener("click", this.handler.bind(this));
    this.#hoursBtnDown.addEventListener("click", this.handler.bind(this));
    this.#minutesBtnUp.addEventListener("click", this.handler.bind(this));
    this.#minutesBtnDown.addEventListener("click", this.handler.bind(this));
    this.#secondsBtnUp.addEventListener("click", this.handler.bind(this));
    this.#secondsBtnDown.addEventListener("click", this.handler.bind(this));
  }

  searchComponentsForSwitcher() {
    this.#hours = this.timer.querySelector(".hours-component");
    this.#minutes = this.timer.querySelector(".minutes-component");
    this.#seconds = this.timer.querySelector(".seconds-component");
  }

  createComponentsForSwitcher() {
    this.#hours.appendChild(createComponents(arrayComponents));
    this.#minutes.appendChild(createComponents(arrayComponents));
    this.#seconds.appendChild(createComponents(arrayComponents));
  }

  handler(event) {
    if (event.target === this.#hoursBtnUp) {
      this.draggingElementUp(event);
    } else if (event.target === this.#hoursBtnDown) {
      this.draggingElementDown(event);
    } else if (event.target === this.#minutesBtnUp) {
      this.draggingElementUp(event);
    } else if (event.target === this.#minutesBtnDown) {
      this.draggingElementDown(event);
    } else if (event.target === this.#secondsBtnUp) {
      this.draggingElementUp(event);
    } else if (event.target === this.#secondsBtnDown) {
      this.draggingElementDown(event);
    }
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
