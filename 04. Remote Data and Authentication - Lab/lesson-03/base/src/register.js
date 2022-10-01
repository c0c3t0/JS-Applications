const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('rePass');

    try {
        if (password !== rePass) {
            throw new Error('Error');
        }

        fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => {
                if (response.status != 200) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then(user => {
                sessionStorage.setItem('accessToken', user.accessToken);
                window.location.pathname = '/04. Remote Data and Authentication - Lab/lesson-03/base/index.html';
            })
    } catch (error) {
        console.error(error.message);
    }
})
