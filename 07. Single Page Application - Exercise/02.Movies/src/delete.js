import { showHome } from "./app.js";

export async function deleteMovie(e) {
    const token = sessionStorage.getItem('accessToken');
    const id = e.target.id;
    try {
        const response = await fetch(`http://localhost:3030/data/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': token
            }
        });

        if (response.status != 200) {
            const error = await response.json();
            throw new Error(error.message);
        }
        showHome();

    } catch (error) {
        alert(error.message);
    }
}
