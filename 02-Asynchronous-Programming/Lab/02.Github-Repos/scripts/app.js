function loadRepos() {
    let usernameEl = document.querySelector('#username');
    let list = document.querySelector('#repos');
    let baseUrl = 'https://api.github.com/users';

    Array.from(list.children).forEach(el => el.remove());
    fetch(`${baseUrl}/${usernameEl.value}/repos`)
        .then(status)
        .then(response => response.json())
        .then(data => {
            Array.from(list.children).forEach(el => el.remove());
            Array.from(data).forEach(el => {
                liEl = document.createElement('li');
                aEl = document.createElement('a');
                aEl.href = el.html_url;
                aEl.textContent = el.full_name;
                liEl.appendChild(aEl);
                list.appendChild(liEl);
            })
        })
        .catch(error => {
            liEl = document.createElement('li');
            liEl.textContent = 'Not Found';
            list.appendChild(liEl);
        })

    function status(res) {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res;
    }
}