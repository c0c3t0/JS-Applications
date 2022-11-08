import { showLogin } from "./login.js";

const nav = document.querySelector('nav');

export async function logout() {
    try {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': sessionStorage.getItem('accessToken')
            }
        });

        if (response.ok) {
            sessionStorage.clear();
            showLogin();

            [...nav.querySelectorAll('.user')].map(el => { el.style.display = 'none' });
            [...nav.querySelectorAll('.guest')].map(el => { el.style.display = 'block' });

        } else {
            const data = await response.json();
            throw new Error(data.message);
        }
        
    } catch (error) {
        alert(error)
    }
}
