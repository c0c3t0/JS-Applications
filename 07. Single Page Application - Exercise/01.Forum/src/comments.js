import { htmlGenerator } from "./dom.js";

export async function showComments(post) {
    console.log(post);
    const container = document.querySelector('.container');
    container.replaceChildren();

    const comments = document.querySelector('.theme-content');
    comments.style.display = 'block';


    // topic
    const divThemeTitle = htmlGenerator('div', '', 'theme-title', document.querySelector('.theme-content'));
    const divThemeNameWrapper = htmlGenerator('div', '', 'theme-name-wrapper', divThemeTitle);
    const divThemeName = htmlGenerator('div', '', 'theme-name', divThemeNameWrapper);
    htmlGenerator('h2', post.title, '', divThemeName);


    // comment header 
    const divHeader = htmlGenerator('div', '', 'header', document.querySelector('.comment'));
    const img = htmlGenerator('img','', '', divHeader);
    img.setAttribute('src', './static/profile.png');
    img.setAttribute('alt', 'avatar');

    const p = htmlGenerator('p', '', '', divHeader); 
    p.innerHTML = `<span>${post.username}</span> posted on <time>${post.date}</time>`
    htmlGenerator('p', post.post, 'post-content', divHeader); 

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
    const data = await response.json();
    console.log(data);


    //  comment body <=============
    const divUserComment = htmlGenerator('div', '', 'user-comment', document.querySelector('.comment'));
    const divTopicNameWrapper = htmlGenerator('div', '', 'topic-name-wrapper', divUserComment);
    const divTopicName = htmlGenerator('div', '', 'topic-name', divTopicNameWrapper);
    const p2 = htmlGenerator('p', '', '', divTopicName); 
    p2.innerHTML = `<strong>${data.username}</strong> commented on <time>${data.date}</time>`;
    const divPostContent = htmlGenerator('div', '', 'post-content', divPostContent);
    // const pPostContent = htmlGenerator('p', data.content, '', divPostContent);






}