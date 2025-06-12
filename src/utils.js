function createElement(elementObject) {
  let newElement;

  if (elementObject) {
    newElement = document.createElement(elementObject.type);
  }

  newElement.id = elementObject.id;
  newElement.classList = elementObject.classList;
  newElement.textContent = elementObject.textContent;

  return newElement;
}

function appendChildren(parent, children) {
  children.forEach((child) => {
    parent.appendChild(child);
  });
}

export { createElement, appendChildren };
