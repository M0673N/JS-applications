import navigation from "../navigation.js";
import services from "../services.js";
import rendering from "../rendering.js";

async function deleteBtnHandler(event) {
    event.preventDefault();
    await services.deleteIdea(event.target.dataset.id);
    navigation.navigateToDashboardPage();
    await rendering.renderDashboard();
}

export default {deleteBtnHandler};