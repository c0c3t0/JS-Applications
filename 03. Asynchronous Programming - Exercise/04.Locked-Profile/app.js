async function lockedProfile() {
    let baseUrl = 'http://localhost:3030/jsonstore/advanced/profiles';
    let main = document.querySelector("#main");
    main.replaceChildren();

    try {
        let response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error('Error');
        }
        let data = await response.json();

        for (let info of Object.values(data)) {
            let divProfile = htmlGenerator('div', '', main, 'profile');
            let imgUserIcon = htmlGenerator('img', '', divProfile, 'userIcon');
            imgUserIcon.setAttribute('src', './iconProfile2.png');
            
            htmlGenerator('label', 'Lock', divProfile);
            let inputLock = htmlGenerator('input', '', divProfile, '', 'radio', 'userLocked');
            inputLock.value = 'lock';
            inputLock.checked = true;

            htmlGenerator('label', 'Unlock', divProfile);
            let inputUnlock = htmlGenerator('input', '', divProfile, '', 'radio', 'userLocked');
            inputUnlock.value = 'unlock';

            htmlGenerator('br', '', divProfile);
            htmlGenerator('hr', '', divProfile);

            htmlGenerator('label', 'Username', divProfile);
            let inputUsername = htmlGenerator('input', '', divProfile, '', 'text', 'userUsername');
            inputUsername.value = `${info.username}`;
            inputUsername.disabled = true;
            inputUsername.readonly = true;

            let divUsername = htmlGenerator('div', '', divProfile);
            divUsername.id = 'userHiddenFields';
            divUsername.style.display = 'none';

            htmlGenerator('hr', '', divUsername);

            htmlGenerator('label', 'Email:', divUsername);
            let inputEmail = htmlGenerator('input', '', divUsername, '', 'email', 'userEmail');
            inputEmail.value = `${info.email}`;
            inputEmail.disabled = true;
            inputEmail.readonly = true;

            htmlGenerator('label', 'Age:', divUsername);
            let inputAge = htmlGenerator('input', '', divUsername, '', 'text', 'userAge');
            inputAge.value = `${info.age}`;
            inputAge.disabled = true;
            inputAge.readonly = true;

            let showMoreBtn = htmlGenerator('button', 'Show more', divProfile);
            showMoreBtn.addEventListener('click', (e) => {
                if (inputUnlock.checked && e.target.textContent === 'Show more') {
                    divUsername.style.display = 'block';
                    showMoreBtn.textContent = 'Hide it';
                } else if (inputUnlock.checked && e.target.textContent === 'Hide it') {
                    divUsername.style.display = 'none';
                    showMoreBtn.textContent = 'Show more';
                }
            })
        }
    } catch (error) {
        console.error(error.message);
    }
}

function htmlGenerator(tagName, text, parent, className, type, name) {
    let el = document.createElement(tagName);
    el.textContent = text;

    if (parent) {
        parent.appendChild(el);
    }

    if (className) {
        el.className = className;
    }

    if (type) {
        el.type = type;
    }

    if (name) {
        el.name = name;
    }

    return el;
}