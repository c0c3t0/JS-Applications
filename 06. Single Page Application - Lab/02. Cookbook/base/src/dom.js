const main = document.querySelector('main');
const nav = document.querySelector('nav');

export function showSection(section) {
    main.replaceChildren(section);
}

export function setActiveNav(targetId) {
    [...nav.querySelectorAll('a')].forEach(a => a.id == targetId ? a.classList.add('active') : a.classList.remove('active'));
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
