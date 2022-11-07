import { showSection } from "./dom.js";

const sections = document.querySelectorAll('.view-section');

export function showRegister() {
    showSection(sections[5]);
}