export function createComponents(components) {
  return components.reduce((object, component, index) => {
    const div = document.createElement("div");
    div.classList.add("single-component");
    div.textContent = component[0];
    div.style.top = component[1] + "px";
    if (index === 1 || index === 3) {
      div.style.opacity = "0.6";
    }
    object.appendChild(div);
    return object;
  }, document.createDocumentFragment());
}
