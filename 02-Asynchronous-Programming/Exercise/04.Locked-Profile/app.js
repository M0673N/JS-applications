function lockedProfile() {
    let profileDiv = document.querySelector('.profile');
    let mainDiv = document.querySelector('#main');

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(response => response.json())
        .then(data => {
            let counter = 1;
            for (const userId in data) {
                let clonedDiv = profileDiv.cloneNode(true);
                let [lockedEl, unlockedEl, usernameEl, emailEl, ageEl] = clonedDiv.querySelectorAll('input');
                let button = clonedDiv.querySelector('button');
                hiddenEl = clonedDiv.querySelector('#user1HiddenFields');

                lockedEl.name = `user${counter}Locked`;
                lockedEl.checked = true;
                unlockedEl.name = `user${counter}Locked`;
                usernameEl.value = data[userId].username;
                usernameEl.name = `user${counter}Username`;
                hiddenEl.id = `user${counter}HiddenFields`;
                hiddenEl.style.display = 'none';
                emailEl.value = data[userId].email;
                emailEl.name = `user${counter}Email`;
                ageEl.value = data[userId].age;
                ageEl.name = `user${counter}Age`;

                button.addEventListener('click', function (event) {
                    let unlockedEl = event.target.parentElement.querySelectorAll('input')[1];
                    if (unlockedEl.checked) {
                        let hiddenEl = event.target.parentElement.querySelector('div');
                        if (event.target.textContent === 'Show more') {
                            hiddenEl.style.display = 'block';
                            event.target.textContent = 'Hide it';
                        } else {
                            hiddenEl.style.display = 'none';
                            event.target.textContent = 'Show more';
                        }
                    }
                });

                counter += 1;
                mainDiv.appendChild(clonedDiv);
            }
            profileDiv.remove()
        })
        .catch(error => {
            'handle the error'
        })
}