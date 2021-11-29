async function showMessage(type, message) {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    let [errorSection, successSection] = document.querySelectorAll('section.notifications');
    if (type === 'error') {
        errorSection.style.display = 'block';
        errorSection.querySelector('p').textContent = message;
        await sleep(1000);
        errorSection.style.display = 'none';
    } else if (type === 'success') {
        successSection.style.display = 'block';
        successSection.querySelector('p').textContent = message;
        await sleep(1000);
        successSection.style.display = 'none';
    }
}

export default {showMessage};