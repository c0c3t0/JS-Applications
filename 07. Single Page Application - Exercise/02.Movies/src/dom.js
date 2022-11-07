const div = document.querySelector('.container');
const nav = document.querySelector('nav');
const footer = document.querySelector('footer');

export function showSection(section) {
    div.replaceChildren(nav, section, footer);
}

export function htmlGenerator(type, text, className, parent) {
    const element = document.createElement(type);
    element.textContent = text;

    if (className) {
        element.className = className;
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}
