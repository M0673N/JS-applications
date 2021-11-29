import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import loginRegisterLogic from "./formsLogic/loginRegisterLogic.js";

export const loginPageTemplate = (context) => html`
    ${navBar({login: 'active'}, context)}
    <main>
        <h1>Login</h1>
        <p class="form-info">Don't have account?
            <a href="/register">Register now</a> and fix that!
        </p>
        <form action="" @submit="${event => loginRegisterLogic.loginFormHandler(event, context)}">
            <div>
                <input type="email" name="email" placeholder="Email...">
            </div>

            <div>
                <input type="password" name="password" placeholder="Password...">
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    </main>
    ${footer()}`