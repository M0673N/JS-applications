const {chromium} = require('playwright-chromium');
const {expect} = require('chai');
const helper = require('./helper.js');

let browser, page;
// change the url if the tests don't work
let pageUrl = 'http://localhost:3000';
let endpoint = 'http://localhost:3030/jsonstore/collections/books';

describe('02.Book-Library tests', function () {
    // setup
    this.timeout(10000)
    before(async () => {
        browser = await chromium.launch();
        // browser = await chromium.launch({headless: false, slowMo: 1000});
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(pageUrl);
    });
    afterEach(async () => {
        await page.close()
    });

    it(`loadAllBooks functionality test`, async () => {
        // mock database
        await page.route(
            endpoint,
            request => request.fulfill(helper.fakeResponse(helper.mockData))
        );

        let expectedResult = `
        <tr data-id="d953e5fb-a585-4d6b-92d3-ee90697398a0">
            <td>Harry Potter and the Philosopher's Stone</td>
            <td>J.K.Rowling</td>
            <td>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </td>
        </tr>
        <tr data-id="d953e5fb-a585-4d6b-92d3-ee90697398a1">
            <td>C# Fundamentals</td>
            <td>Svetlin Nakov</td>
            <td>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </td>
        </tr>`;

        await page.click('#loadBooks');
        let actualResult = await page.innerHTML('body > table > tbody');

        expect(actualResult).to.eq(expectedResult)
    });

    it(`submitBtn functionality test happy case`, async () => {
        await page.fill('#createForm > input[type=text]:nth-child(3)', 'testTitle');
        await page.fill('#createForm > input[type=text]:nth-child(5)', 'testAuthor');

        const [request] = await Promise.all([
            page.waitForRequest(endpoint),
            page.click('#createForm > button')
        ]);

        let body = request.postDataJSON();
        let headers = await request.headersArray();
        let method = request.method();

        expect(body).to.deep.eq({'title': 'testTitle', 'author': 'testAuthor'});
        expect(headers).to.deep.include.members([{name: 'Content-Type', value: 'application/json'}]);
        expect(method).to.eq('POST');
    });

    it(`submitBtn functionality test missing fields`, async () => {
        let expectedResult = 'All fields are required!';
        let actualResult;

        await Promise.all([
            page.on('dialog', dialog => {
                actualResult = dialog.message();
                dialog.accept();
            }),
            page.click('#createForm > button')
        ]);

        expect(actualResult).to.deep.eq(expectedResult);
    });

    it(`editBtn functionality test form visibility`, async () => {
        // mock database
        await page.route(
            endpoint,
            request => request.fulfill(helper.fakeResponse(helper.mockData))
        );
        await page.route(
            `**${endpoint}/d953e5fb-a585-4d6b-92d3-ee90697398a1`,
            request => request.fulfill(helper.fakeResponse(helper.mockData["d953e5fb-a585-4d6b-92d3-ee90697398a1"]))
        );

        await page.click('#loadBooks');
        await page.click('body > table > tbody > tr:nth-child(2) > td:nth-child(3) > button.editBtn');

        let createForm = await page.isVisible('#createForm');
        let editForm = await page.isVisible('#editForm');
        let title = await page.inputValue('#editForm > input[type=text]:nth-child(4)');
        let author = await page.inputValue('#editForm > input[type=text]:nth-child(6)');

        expect(createForm).to.be.false;
        expect(editForm).to.be.true;
        expect(title).to.eq('C# Fundamentals');
        expect(author).to.eq('Svetlin Nakov');
    });

    it(`editBtn functionality test request data`, async () => {
        // mock database
        await page.route(
            endpoint,
            request => request.fulfill(helper.fakeResponse(helper.mockData))
        );
        await page.route(
            `**${endpoint}/d953e5fb-a585-4d6b-92d3-ee90697398a1`,
            request => request.fulfill(helper.fakeResponse(helper.mockData["d953e5fb-a585-4d6b-92d3-ee90697398a1"]))
        );

        await page.click('#loadBooks');
        await page.click('body > table > tbody > tr:nth-child(2) > td:nth-child(3) > button.editBtn');
        await page.fill('#editForm > input[type=text]:nth-child(4)', 'testTitle');
        await page.fill('#editForm > input[type=text]:nth-child(6)', 'testAuthor');

        const [request] = await Promise.all([
            page.waitForRequest(`**${endpoint}/*`),
            page.click('#editForm > button')
        ]);

        let body = await request.postDataJSON();
        let headers = await request.headersArray();
        let method = await request.method();

        expect(body).to.deep.eq({'title': 'testTitle', 'author': 'testAuthor'});
        expect(headers).to.deep.include.members([{name: 'Content-Type', value: 'application/json'}]);
        expect(method).to.eq('PUT');
    });

    it(`deleteBtn functionality test`, async () => {
        // mock database
        await page.route(
            endpoint,
            request => request.fulfill(helper.fakeResponse(helper.mockData))
        );
        await page.route(
            `**${endpoint}/d953e5fb-a585-4d6b-92d3-ee90697398a1`,
            request => request.fulfill(helper.fakeResponse(helper.mockData["d953e5fb-a585-4d6b-92d3-ee90697398a1"]))
        );
        let message;

        await page.click('#loadBooks');
        await Promise.all([
            page.on('dialog', dialog => {
                message = dialog.message();
                dialog.accept();
            }),
            page.click('body > table > tbody > tr:nth-child(2) > td:nth-child(3) > button.deleteBtn')
        ]);


        const [request] = await Promise.all([
            page.waitForRequest(`**${endpoint}/*`),
            page.click('body > table > tbody > tr:nth-child(2) > td:nth-child(3) > button.deleteBtn')
        ]);

        let method = await request.method();

        expect(message).to.eq('Are you sure you want to delete this book?');
        expect(method).to.eq('DELETE');
    });
});