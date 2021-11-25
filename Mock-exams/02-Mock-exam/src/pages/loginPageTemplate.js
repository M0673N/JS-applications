import {html} from "/node_modules/lit-html/lit-html.js";
import {navBar} from "./common.js";
import loginRegisterLogic from "./formsLogic/loginRegisterLogic.js";

export const loginPageTemplate = () => html`
    ${navBar({login: 'active'})}
    <main>
        <section id="login-page" class="auth">
            <form id="login" @submit="${loginRegisterLogic.loginFormHandler}">
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    </main>`