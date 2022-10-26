const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let data = new FormData(e.target);
    let name = data.get('name');
    let img = data.get('img');
    let ingredients = data.get('ingredients').split('\n');
    let steps = data.get('steps').split('\n');
    console.log(steps);

    let token = sessionStorage.getItem('accessToken');
    if (!token){
        window.location.pathname = '06. Single Page Application - Lab/02. Cookbook/base/index.html';
    }

    try {
        fetch('http://localhost:3030/data/recipes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                name,
                img,
                ingredients,
                steps
            })

        })
            .then(response => {
                if (response.ok) {
                    window.location.pathname = '06. Single Page Application - Lab/02. Cookbook/base/index.html';
                } else {
                    throw new Error(response.json());
                }
            })
    } catch (error) {
        console.error(error.message)
    }
})
