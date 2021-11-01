function loadCommits() {
    let usernameEl = document.querySelector('#username');
    let repoEl = document.querySelector('#repo');
    let baseUrl = 'https://api.github.com/repos';
    let list = document.querySelector('#commits');

    Array.from(list.children).forEach(el => el.remove());

    fetch(`${baseUrl}/${usernameEl.value}/${repoEl.value}/commits`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(`Error: ${response.status} (Not Found)`)
            }
        })
        .then(data => {

            data.forEach(el => {
                let liEl = document.createElement('li');
                liEl.textContent = `${el.commit.author.name}: ${el.commit.message}`;
                list.appendChild(liEl);
            });
        })
        .catch(error => {
            Array.from(list.children).forEach(el => el.remove());
            let liEl = document.createElement('li');
            liEl.textContent = error.message;
            list.appendChild(liEl);
        })
}