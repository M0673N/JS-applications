function attachEvents() {
    let msgBox = document.getElementById('messages');
    let [authorEl, contentEl, submitBtn, refreshBtn] = document.querySelectorAll('input');

    refreshBtn.addEventListener('click', async function (event) {
        try {
            let data = await fetch('http://localhost:3030/jsonstore/messenger')
                .then(data => data.json());
            let result = [];
            for (const key in data) {
                result.push(`${data[key].author}: ${data[key].content}`);
            }
            msgBox.value = result.join('\n');
        } catch (error) {
            '...'
        }
    });

    submitBtn.addEventListener('click', function (event) {
        fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                author: authorEl.value,
                content: contentEl.value,
            })
        })
            .catch(error => {
                '...'
            })
        authorEl.value = '';
        contentEl.value = '';
    });
}

attachEvents();