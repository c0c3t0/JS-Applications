import { showSection } from "./dom.js";

const sections = document.querySelectorAll('.view-section');

export function showLogin() {
    showSection(sections[4]);
}