import { getTopics } from './load.js';
import { getFormData} from './create.js';

const container = document.querySelector('.container');
const main = document.querySelector('main');

window.addEventListener('load', showHome);
document.querySelector('a').addEventListener('click', showHome);


const form = document.querySelector('form');
form.addEventListener('submit', getFormData);

function showHome() {
   container.replaceChildren(main);

    getTopics();
}
