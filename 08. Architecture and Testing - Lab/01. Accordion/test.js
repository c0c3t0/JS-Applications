const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const DEBUG = false;
const slowMo = 500;
let browser, page;

describe('E2E tests', async function () {
    this.timeout(7000);

    before(async () => { browser = await chromium.launch(DEBUG ? { headless: false, slowMo } : {}); })
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('loads article titles', async () => {
        await page.goto('http://localhost:5500');

        const content = await page.textContent('#main');

        expect(content).to.contain('Scalable Vector Graphics');
        expect(content).to.contain('Open standard');
        expect(content).to.contain('Unix');
        expect(content).to.contain('ALGOL');
    });

    it('button "More" functionality', async () => {
        await page.goto('http://localhost:5500');
        await page.click('.accordion >> text=More');
        await page.waitForSelector('.extra p');

        expect(await page.isVisible('.extra p')).to.be.true;
        expect(await page.textContent('.extra p')).to.contain('Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999.');
        expect(await page.textContent('.accordion >> button')).to.equal('Less');
    });

    it('button "Less" functionality', async () => {
        await page.goto('http://localhost:5500');
        await page.click('.accordion >> text=More');
        await page.waitForSelector('.extra p');

        await page.click('.accordion >> text=Less');

        expect(await page.isVisible('.extra p')).to.be.false;
        expect(await page.textContent('.accordion >> button')).to.equal('More');
    });

});

