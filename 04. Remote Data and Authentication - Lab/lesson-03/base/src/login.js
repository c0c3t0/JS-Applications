const form = document.querySelector('form')

form.addEventListener('submit', (e => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');

    try {
        fetch('http://localhost:3030/users/login', {
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
                    throw new Error(response.message);
                }
                return response.json();
            })
            .then(user => {
                console.log(user);
                sessionStorage.setItem('accessToken', user.accessToken);
                window.location.pathname = '/04. Remote Data and Authentication - Lab/lesson-03/base/index.html';
            })
    } catch (error) {
        console.error(error.message);
    }
}))
