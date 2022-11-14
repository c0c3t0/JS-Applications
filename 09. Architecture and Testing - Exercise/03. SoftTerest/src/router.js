

export function router(links) {
    const main = document.querySelector('#mainView');
    main.replaceChildren();

    const nav = document.querySelector('nav');
    nav.addEventListener('click', onNavigate);

    const context = {
        showSection,
        goTo,
    }

    return context;

    function showSection(section) {
        main.replaceChildren(section);
        updateNavigation();
    }

    function onNavigate(e) {
        e.preventDefault();
        let target = e.target;
        if (target.tagName === 'IMG') {
            target = target.parentElement;
        }
        if (target.tagName === 'A') {
            const path = target.pathname;
            goTo(path);
        }
    }

    function goTo(name) {
        const handler = links[name];

        if (typeof handler === 'function') {
            handler(context);
        }
    }

    function updateNavigation() {
        if (sessionStorage.getItem('user')) {
            [...nav.querySelectorAll('.user')].map(e => e.style.display = 'block');
            [...nav.querySelectorAll('.guest')].map(e => e.style.display = 'none');
        } else {
            [...nav.querySelectorAll('.user')].map(e => e.style.display = 'none');
            [...nav.querySelectorAll('.guest')].map(e => e.style.display = 'block');
        }
    }
}