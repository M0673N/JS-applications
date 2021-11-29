import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import loginRegisterLogic from "./formsLogic/loginRegisterLogic.js";

export const registerPageTemplate = (context) => html`
    ${navBar({register: 'active'}, context)}
    <main id="site-content">
        <section id="register-page" class="register">
            <form id="register-form" action="" method="" @submit="${event => loginRegisterLogic.registerFormHandler(event, context)}">
                <fieldset>
                    <legend>Register Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>
    </main>
    ${footer()}`