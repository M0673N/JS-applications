import navigation from '../navigation.js';
import descriptionPageLogic from './descriptionPageLogic.js';
import services from "../services.js";

async function detailsBtnHandler(event) {
    event.preventDefault();
    navigation.navigateToDescriptionPage();
    let descriptionPage = document.querySelector('div.container.home.some');
    let img = descriptionPage.querySelector('img');
    let deleteBtn = descriptionPage.querySelector('a');
    deleteBtn.remove();
    let deleteDiv = descriptionPage.querySelector('div.text-center')
    let titleEl = descriptionPage.querySelector('h2');
    let descriptionEl = descriptionPage.querySelectorAll('p')[1];
    let data = await services.getIdea(event.target.dataset.id);
    img.src = data.img;
    titleEl.textContent = data.title;
    descriptionEl.textContent = data.description;
    if (data._ownerId === localStorage.getItem('personId')) {
        deleteDiv.appendChild(deleteBtn);
    } else {
        deleteBtn.remove();
    }
    deleteBtn.dataset.id = data._id;
    deleteBtn.addEventListener('click', descriptionPageLogic.deleteBtnHandler)
}

export default {detailsBtnHandler}