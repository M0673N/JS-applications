import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import loginRegisterLogic from "./formsLogic/loginRegisterLogic.js";

export const registerPageTemplate = (context) => html`
    ${navBar({register: 'active'}, context)}
    <main id="site-content">
        <h1>Register</h1>
        <p class="form-info">Already registered?
            <a href="/login">Login now</a> and have some fun!
        </p>

        <form action="" @submit="${event => loginRegisterLogic.registerFormHandler(event, context)}">
            <div>
                <input type="email" name="email" placeholder="Email...">
            </div>
            <div>
                <input type="password" name="password" placeholder="Password">
            </div>
            <div>
                <input type="password" name="repeatPass" placeholder="Re-password">
            </div>
            <div>
                <p class="message"></p>
                <button>Register</button>
            </div>
        </form>
    </main>
    ${footer()}`