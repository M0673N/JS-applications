import {html} from "../../node_modules/lit-html/lit-html.js";
import {footerTemplate, navBar} from "./common.js";
import loginRegisterLogic from "./formsLogic/loginRegisterLogic.js";

export const loginPageTemplate = () => html`
    ${navBar({login: 'active'})}
    <main>
        <section id="notifications">
            <div id="errorBox" class="notification">
                <span>MESSAGE</span>
            </div>
        </section>
        <section id="login">
            <form id="login-form" @submit="${loginRegisterLogic.loginFormHandler}">
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
                </div>
            </form>
        </section>
    </main>
    ${footerTemplate()}`