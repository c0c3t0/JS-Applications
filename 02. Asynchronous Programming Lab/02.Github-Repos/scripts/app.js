function loadRepos() {
	let username = document.querySelector("#username");
	let listRepos = document.querySelector("#repos");

	fetch(`https://api.github.com/users/${username.value}/repos`)
		.then((response) => response.json())
		.then((data) => {
			listRepos.innerHTML = '';

			data.forEach(repo => {
				let repoElement = document.createElement('li');
				let aElement = document.createElement('a');
				aElement.textContent = repo.full_name;
				aElement.setAttribute('href', repo.html_url);
				repoElement.appendChild(aElement);
				listRepos.appendChild(repoElement);
			})
		})
		.catch((error) => console.error(error));
}

