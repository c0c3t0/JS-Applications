export function htmlGenerator(type, parent, textCon, classList) {
    const element = document.createElement(type);

    if (textCon) {
        element.textContent = textCon;
    }
    if (classList) {
        element.classList = classList;
    }
    if (parent) {
        parent.appendChild(element);
    }

    return element;
}