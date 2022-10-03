const userNav = document.querySelector('#user');
const guestNav = document.querySelector('#guest');
const greetingMsg = document.querySelector('.email span');
const logoutBtn = document.querySelector('#logout');

async function logout() {
    await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {
            'X-Authorization': sessionStorage.getItem('accessToken')
        }
    })
    sessionStorage.clear();
    window.location.href = './index.html';
}

window.addEventListener('load', async () => {
    if (sessionStorage.accessToken) {
        userNav.style.display = 'inline-block';
        guestNav.style.display = 'none';
        greetingMsg.textContent = sessionStorage.getItem('email');
        logoutBtn.addEventListener('click', logout);

    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline-block';
        greetingMsg.textContent = 'guest';
    }
})

