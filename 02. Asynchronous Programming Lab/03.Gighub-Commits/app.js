function loadCommits() {
    let nameInput = document.querySelector('#username');
    let repoInput = document.querySelector('#repo');
    let ul = document.querySelector('#commits');
    ul.innerHTML = '';
    let url = `https://api.github.com/repos/${nameInput.value}/${repoInput.value}/commits`;

    fetch(url)
        .then(responce => {
            if (responce.ok) {
                return responce.json();
            } else {
                errorCatcher(responce);
            }
        })
        .then(data => {
            data.forEach(commit => {
                let li = document.createElement('li');
                li.textContent = `${commit.commit.author.name}: ${commit.commit.message}`
                ul.appendChild(li);
            });
        })
        
        function errorCatcher(res) {
            let li = document.createElement('li');
            li.textContent = `Error: ${res.status} (Not Found)`;
            ul.appendChild(li);
        }
    
}