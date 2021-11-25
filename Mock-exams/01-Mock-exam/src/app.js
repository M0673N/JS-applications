import page from "../node_modules/page/page.mjs";
import rendering from "./rendering.js";
import authService from "./services/authService.js";

await rendering.home();

page('/', '/home');
page('/home', rendering.home);
if (authService.isAuthenticated()) {
    page('/home', '/dashboard');
}
page('/dashboard', rendering.dashboard);
page('/register', rendering.register);
page('/create', rendering.create);
page('/login', rendering.login);
page('/profile', rendering.profile);
page('/details-:id', rendering.details);
page('/edit-:id', rendering.edit);

page.start();