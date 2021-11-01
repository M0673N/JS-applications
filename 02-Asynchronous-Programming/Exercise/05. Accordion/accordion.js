async function solution() {
    function buildDiv(el, elData) {
        let mainDiv = document.createElement('div');
        mainDiv.className = 'accordion';

        let headDiv = document.createElement('div');
        headDiv.className = 'head';

        let newSpan = document.createElement('span');
        newSpan.textContent = el.title;
        headDiv.appendChild(newSpan);

        let newButton = document.createElement('button');
        newButton.className = 'button';
        newButton.id = el._id;
        newButton.textContent = 'More';
        headDiv.appendChild(newButton);
        newButton.addEventListener('click', function (event) {
            targetDiv = event.target.parentElement.parentElement.querySelector('.extra');
            if (event.target.textContent === 'More') {
                targetDiv.style.display = 'block';
                event.target.textContent = 'Less';
            } else {
                targetDiv.style.display = 'none';
                event.target.textContent = 'More';
            }
        });

        mainDiv.appendChild(headDiv);

        let extraDiv = document.createElement('div');
        extraDiv.className = 'extra';

        let newP = document.createElement('p');
        newP.textContent = elData.content
        extraDiv.appendChild(newP);

        mainDiv.appendChild(extraDiv);

        return mainDiv;
    }

    try {
        let mainSection = document.querySelector('#main')
        let data = await fetch('http://localhost:3030/jsonstore/advanced/articles/list')
            .then(data => data.json());

        listOfPromises = []
        for (const el of data) {
            listOfPromises.push(fetch('http://localhost:3030/jsonstore/advanced/articles/details/' + el._id)
                .then(data => data.json()));
        }
        let elData = await Promise.all(listOfPromises);
        for (const el of data) {
            let div = buildDiv(el, elData.shift());
            mainSection.appendChild(div);
        }

    } catch (error) {
        'handle error'
    }
}

solution()