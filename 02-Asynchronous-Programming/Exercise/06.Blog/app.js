function attachEvents() {
    let loadPostsBtn = document.querySelector('#btnLoadPosts');
    let postsEl = document.querySelector('#posts');
    let viewBtn = document.querySelector('#btnViewPost');
    let headingEl = document.querySelector('#post-title');
    let postBodyEl = document.querySelector('#post-body');
    let commentsListEl = document.querySelector('#post-comments');


    loadPostsBtn.addEventListener('click', async function (event) {
        try {
            let data = await fetch('http://localhost:3030/jsonstore/blog/posts').then(data => data.json());

            for (const key in data) {
                let newOption = document.createElement('option');
                newOption.value = key;
                newOption.textContent = data[key].title.toUpperCase();
                postsEl.appendChild(newOption);
            }
        } catch (error) {
            'handle error'
        }
    });

    viewBtn.addEventListener('click', async function (event) {
        try {
            if (postsEl.value === '') {
                return;
            }
            Array.from(commentsListEl.children).forEach(el => el.remove());
            let commentsData = fetch(`http://localhost:3030/jsonstore/blog/comments`).then(data => data.json());
            let postData = fetch(`http://localhost:3030/jsonstore/blog/posts/${postsEl.value}`).then(data => data.json());

            [commentsData, postData] = await Promise.all([commentsData, postData]);

            let commentsList = [];
            for (const comment in commentsData) {
                if (commentsData[comment].postId === postsEl.value) {
                    commentsList.push(commentsData[comment].text)
                }
            }

            headingEl.textContent = postData.title.toUpperCase();
            postBodyEl.textContent = postData.body;
            commentsList.forEach(el => {
                let newLi = document.createElement('li');
                newLi.textContent = el;
                commentsListEl.appendChild(newLi);
            })
        } catch (error) {
            'handle error'
        }
    });
}

attachEvents();