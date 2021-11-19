import {html} from "/node_modules/lit-html/lit-html.js";
import {navBar} from "../common.js";

const buttonsTemplate = (deleteHandler, id) => html`
    <div>
        <a href="/edit/${id}" class="btn btn-info">Edit</a>
        <a href="" class="btn btn-red" @click=${deleteHandler}>Delete</a>
    </div>`

export const detailsPageTemplate = (data, deleteHandler, id) => html`
    ${navBar({})}
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${`${data.img.slice(1)}`}" onerror="this.src=\`${data.img}\`"/>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${data.make}</span></p>
                <p>Model: <span>${data.model}</span></p>
                <p>Year: <span>${data.year}</span></p>
                <p>Description: <span>${data.description}</span></p>
                <p>Price: <span>${data.price}</span></p>
                <p>Material: <span>${data.material}</span></p>
                ${data._ownerId === localStorage.getItem('userId') ? buttonsTemplate(deleteHandler, id) : ''}
            </div>
        </div>
    </div>`