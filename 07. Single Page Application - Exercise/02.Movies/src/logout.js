import { showHome } from "./app.js";

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
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('userEmail');
            showHome();
        } else {
            throw new Error(await response.json());
        }

    } catch (error) {
        alert(error.message)
    }
}
