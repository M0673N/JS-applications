import page from "/node_modules/page/page.mjs";
import rendering from "./rendering.js";

await rendering.home();

page('/', '/home');
page('/home', rendering.home);
page('/register', rendering.register);
page('/create', rendering.create);
page('/login', rendering.login);
page('/details-:id', rendering.details);
page('/edit-:id', rendering.edit);

page.start();