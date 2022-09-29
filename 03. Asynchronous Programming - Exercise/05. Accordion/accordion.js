let main = document.querySelector("#main");
let baseUrl = 'http://localhost:3030/jsonstore/advanced/articles';

async function solution() {
    try {
        let response = await fetch(`${baseUrl}/list`);
        if (!response.ok) {
            throw new Error('Error');
        }
        let data = await response.json();

        Object.values(data).forEach(el => {
            let divAccordion = htmlGenerator('div', '', main, 'accordion');

            let divHead = htmlGenerator('div', '', divAccordion, 'head');
            htmlGenerator('span', `${el.title}`, divHead);
            let buttonMore = htmlGenerator('button', 'More', divHead, 'button');
            buttonMore.id = el._id;

            let divExtra = htmlGenerator('div', '', divAccordion, 'extra');
            htmlGenerator('p', '', divExtra);

            buttonMore.addEventListener('click', (e) => showHiddenInfo(e));
        })

    } catch (error) {
        console.error(error.message);
    }
}

async function showHiddenInfo(e) {
    btnId = e.target.id;
    let div = e.target.parentNode.parentNode.querySelector(".extra");
    let p = div.querySelector('p');

    try {
        let res = await fetch(`${baseUrl}/details/${btnId}`);
        if (!res.ok) {
            throw new Error('Error');
        }
        let info = await res.json();

        if (e.target.textContent === 'More') {
            e.target.textContent = "Less";
            div.style.display = 'block';
            p.textContent = info.content;
        } else if (e.target.textContent !== 'More') {
            e.target.textContent = "More";
            div.style.display = 'none';
        }

    } catch (error) {
        console.error(error.message);
    }
}

function htmlGenerator(tagName, content, parent, className) {
    let el = document.createElement(tagName);
    el.textContent = content;

    if (parent) {
        parent.appendChild(el);
    }

    if (className) {
        el.className = className;
    }

    return el;
}

solution();
