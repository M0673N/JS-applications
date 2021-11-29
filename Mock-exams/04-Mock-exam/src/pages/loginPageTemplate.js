import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import loginRegisterLogic from "./formsLogic/loginRegisterLogic.js";

export const loginPageTemplate = (context) => html`
    ${navBar({login: 'active'}, context)}
    <main id="site-content">
        <section id="login">
            <div class="container">
                <form id="login-form" action="#" method="post"
                      @submit="${event => loginRegisterLogic.loginFormHandler(event, context)}">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>

                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Dont have an account?
                        <a href="/register">Sign up</a>.
                    </p>
                </div>
            </div>
        </section>
    </main>
    ${footer()}`