const {chromium} = require('playwright-chromium');
const {expect} = require('chai');
const helper = require('./helper.js');

let browser, page;
// change the url if the tests don't work
let pageUrl = 'http://localhost:3000';
let endpoint = 'http://localhost:3030/jsonstore/messenger';

describe('01.Messenger tests', function () {
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

    it(`loadBtn functionality test`, async () => {
        // mock database
        await page.route(
            endpoint,
            request => request.fulfill(helper.fakeResponse(helper.mockData))
        );

        let expectedResult = 'Spami: Hello, are you there?\n' +
            'Garry: Yep, whats up :?\n' +
            'Spami: How are you? Long time no see? :)\n' +
            'George: Hello, guys! :))\n' +
            'Spami: Hello, George nice to see you! :)))';

        await page.click('#refresh');
        let actualResult = await page.inputValue('#messages');

        expect(actualResult).to.eq(expectedResult)
    })

    it(`sendBtn functionality test`, async () => {
        await page.fill('#author', 'testPerson');
        await page.fill('#content', 'testContent');

        const [request] = await Promise.all([
            page.waitForRequest(endpoint),
            await page.click('#submit')
        ]);

        let body = request.postDataJSON();
        let headers = await request.headersArray();
        let method = request.method();

        expect(body).to.deep.eq({'author': 'testPerson', 'content': 'testContent'});
        expect(headers).to.deep.include.members([{name: 'Content-Type', value: 'application/json'}]);
        expect(method).to.eq('POST');
    })
});