import CRUDService from "../../services/CRUDService.js";

async function submitHandler(event, gameId) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries([...formData.entries()]);

    if (!data.comment.trim()) {
        return;
    }

    data = {gameId, comment: data.comment};
    try {
        await CRUDService.createComment(data);
        location.href = `/details-${gameId}`;
    } catch (error) {
        alert(error.message);
    }
}

export default {submitHandler}