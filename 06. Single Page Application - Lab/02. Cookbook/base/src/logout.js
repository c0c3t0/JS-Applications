import { showCatalog } from "./catalog.js";

export async function logout() {
    try {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': sessionStorage.getItem('accessToken')
            }
        });

        if (response.ok) {
            sessionStorage.removeItem('accessToken');
            document.querySelector('#user').style.display = 'none';
            document.querySelector('#guest').style.display = 'inline-block';

            showCatalog();
        } else {
            throw new Error(await response.json());
        }

    } catch (error) {
        alert(error.message)
    }
}
