function loadRepos() {
    let button = document.querySelector('button');
    let targetDiv = document.querySelector('#res');
    let targetUrl = 'https://api.github.com/users/testnakov/repos';
    let newXmlHttpRequest = new XMLHttpRequest();
    newXmlHttpRequest.addEventListener('readystatechange', function (event) {
        if (newXmlHttpRequest.readyState === 4 && newXmlHttpRequest.status === 200) {
            targetDiv.textContent = newXmlHttpRequest.responseText;
        }
    })
    newXmlHttpRequest.open('GET', targetUrl);
    newXmlHttpRequest.send();
}