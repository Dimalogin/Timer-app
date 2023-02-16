export function draggingUp(parent) {
  const [element, result] = parent.className.split("__");
  const component = parent.querySelector(`.${result}-component`);
  const components = component.querySelectorAll(".single-component");

  components[0].remove();
  components[1].style.top = "-100px";
  components[2].style.opacity = "0.6";
  components[2].style.top = "-50px";
  components[3].style.opacity = "1";
  components[3].style.top = "0px";
  components[4].style.opacity = "0.6";
  components[4].style.top = "50px";

  let lastElement = Number(components[4].textContent);

  if (result === "hours") {
    if (lastElement === 23) {
      lastElement = -1;
    }
  }

  if (lastElement === 60) {
    lastElement = -1;
  }

  const div = createComponent();
  div.textContent = String(lastElement + 1).padStart(2, "0");
  div.style.top = "100px";
  component.appendChild(div);
}

export function draggingDown(parent) {
  const [element, result] = parent.className.split("__");
  const component = parent.querySelector(`.${result}-component`);
  const components = component.querySelectorAll(".single-component");

  let firstElement = Number(components[0].textContent);

  if (result === "hours") {
    if (firstElement === 0) {
      firstElement = 24;
    }
  }

  if (firstElement === 0) {
    firstElement = 61;
  }

  const div = createComponent();

  div.textContent = String(firstElement - 1).padStart(2, "0");
  div.style.top = "-100px";

  component.insertBefore(div, component.firstChild);
  components[0].style.top = "-50px";
  components[0].style.opacity = "0.6";
  components[1].style.top = "0px";
  components[1].style.opacity = "1";
  components[2].style.top = "50px";
  components[2].style.opacity = "0.6";
  components[3].style.top = "100px";
  components[4].remove();
}

function createComponent() {
  const div = document.createElement("div");
  div.classList.add("single-component");
  return div;
}
