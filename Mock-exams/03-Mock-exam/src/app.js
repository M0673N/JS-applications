import page from "/node_modules/page/page.mjs";
import rendering from "./rendering.js";

await rendering.dashboard();

page('/', '/dashboard');
page('/dashboard', rendering.dashboard);
page('/register', rendering.register);
page('/create', rendering.create);
page('/login', rendering.login);
page('/details-:id', rendering.details);
page('/edit-:id', rendering.edit);
page('/myItems', rendering.myItems)

page.start();