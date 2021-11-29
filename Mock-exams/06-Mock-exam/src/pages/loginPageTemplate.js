import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import loginRegisterLogic from "./formsLogic/loginRegisterLogic.js";

export const loginPageTemplate = (context) => html`
    ${navBar({login: 'active'}, context)}
    <form class="text-center border border-light p-5" action="" method=""
          @submit="${event => loginRegisterLogic.loginFormHandler(event, context)}">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>
    ${footer()}`