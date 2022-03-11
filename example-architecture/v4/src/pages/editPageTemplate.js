import {html} from "/node_modules/lit-html/lit-html.js";
import {navBar} from "./common.js";
import createEditLogic from "./formsLogic/createEditLogic.js";

export const editPageTemplate = (data, context) => html`
    ${navBar({edit: 'active'}, context)}
    <main>
        <section id="edit-listing">
            <div class="container">

                <form id="edit-form" @submit="${event => createEditLogic.editFormHandler(event, context, data._id)}">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" .value="${data.brand}">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" .value="${data.model}">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" .value="${data.description}">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" .value="${data.year}">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${data.imageUrl}">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" .value="${data.price}">

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
    </main>`