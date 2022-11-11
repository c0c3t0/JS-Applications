//@ts-check
const { chromium } = require('playwright-chromium');
const { expect } = require('chai');


let browser;
let context;
let page;

describe('E2E tests', function () {
    this.timeout(6000);

    before(async () => {
        // browser = await chromium.launch({ headless: false, slowMo: 500 });
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();

        // block intensive resources and external calls (page routes take precedence)
        await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
        await context.route(url => {
            return url.hostname != 'localhost';
        }, route => route.abort());

        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });


    it('loads article titles', async () => {
        await page.goto('http://localhost:5500');

        const content = await page.textContent('#main');

        expect(content).to.contain('Scalable Vector Graphics');
        expect(content).to.contain('Open standard');
        expect(content).to.contain('Unix');
        expect(content).to.contain('ALGOL');
    });
});
