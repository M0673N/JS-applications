import './pages/navBarLogic.js';
import './pages/homePageLogic.js';
import './pages/registerPageLogic.js';
import './pages/loginPageLogic.js';
import './pages/createPageLogic.js';
import navigation from "./navigation.js";
import rendering from "./rendering.js";

rendering.renderNavBar();
navigation.navigateToHomePage();
document.body.scrollTop = document.documentElement.scrollTop = 0;