// export function showSection(section) {
//     main.replaceChildren(section);
// }

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
