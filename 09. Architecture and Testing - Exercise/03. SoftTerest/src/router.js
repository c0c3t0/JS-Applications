

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
}