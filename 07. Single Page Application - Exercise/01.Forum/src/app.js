import { getTopics } from './load.js';

document.querySelector('a').addEventListener('click', getTopics);

const comments = document.querySelector('.theme-content');
comments.style.display = 'none'; // flex

getTopics();