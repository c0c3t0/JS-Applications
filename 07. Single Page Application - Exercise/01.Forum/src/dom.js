import { getComments } from "./comments.js";

const container = document.querySelector('.container');
const section = document.querySelector('.theme-content');
const themeTitle = document.querySelector('.theme-title');
const header = document.querySelector('.header');
const userComment = document.querySelector('#user-comment');
const topics = document.querySelector('.topic-container');
const topicName = document.querySelector('.topic-name');

section.remove();

export function createTopicHTML(data) {
    const { title, username, post, date, _id } = data;

    const topic = htmlGenerator('div', '', 'topic-name-wrapper', topics);
    topic.id = _id;

    const divTopicName = htmlGenerator('div', '', 'topic-name', topic);
    const aNormal = htmlGenerator('a', '', 'normal', divTopicName);
    aNormal.setAttribute('href', '#');
    htmlGenerator('h2', title, '', aNormal);

    const divColumns = htmlGenerator('div', '', 'columns', divTopicName);
    const div1 = htmlGenerator('div', '', '', divColumns);
    const p = htmlGenerator('p', 'Date: ', '', div1);
    htmlGenerator('time', date, '', p);

    const divNickname = htmlGenerator('div', '', 'nick-name', div1);
    const pUsername = htmlGenerator('p', 'Username: ', '', divNickname);
    htmlGenerator('span', username, '', pUsername);

    return topic;
}

export function createTopicDetailsHTML(topic) {
    const { title, username, post, date, _id } = topic;

    container.replaceChildren(section);

    // topic title
    themeTitle.replaceChildren();
    const divThemeTitle = htmlGenerator('div', '', 'theme-title', themeTitle);
    divThemeTitle.id = _id;

    const divThemeNameWrapper = htmlGenerator('div', '', 'theme-name-wrapper', divThemeTitle);
    const divThemeName = htmlGenerator('div', '', 'theme-name', divThemeNameWrapper);
    htmlGenerator('h2', title, '', divThemeName);

    // topic header 
    header.replaceChildren();
    const img = htmlGenerator('img', '', '', header);
    img.setAttribute('src', './static/profile.png');
    img.setAttribute('alt', 'avatar');

    const p = htmlGenerator('p', '', '', header);
    p.innerHTML = `<span>${username}</span> posted on <time>${date}</time>`
    htmlGenerator('p', post, 'post-content', header);

    return divThemeTitle;
}

export function createUserCommentHTML(comment) {
    const { content, username, postId, date, _id } = comment;

    // const divTopicNameWrapper = htmlGenerator('div', '', 'topic-name-wrapper', userComment);

    // const divTopicName = htmlGenerator('div', '', 'topic-name', divTopicNameWrapper);
    const p2 = htmlGenerator('p', '', '', topicName);
    p2.innerHTML = `<strong>${username}</strong> commented on <time>${date}</time>`;

    const divPostContent = htmlGenerator('div', '', 'post-content', topicName);
    htmlGenerator('p', content, '', divPostContent);
}

function htmlGenerator(type, text, className, parent) {
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
