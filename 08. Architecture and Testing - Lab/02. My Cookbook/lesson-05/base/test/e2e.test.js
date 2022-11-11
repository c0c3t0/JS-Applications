//@ts-check
const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const mockData = require('./mock-data.json');
const host = 'http://localhost:5500/base';
const endpoints = {
    recipes: '/data/recipes?select=_id%2Cname%2Cimg',
    count: '/data/recipes?count',
    recent: '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc',
    recipe_by_id: '/data/recipes/3987279d-0ad4-4afb-8ca9-5b256ae3b298',
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    create: '/data/recipes'
};

const mock = {
    users: [
        {
            _id: '0001',
            email: 'peter@abv.bg',
            password: '123456',
            accessToken: 'AAAA',
        },
        {
            _id: '0002',
            email: 'john@abv.bg',
            password: '123456',
            accessToken: 'BBBB',
        },
    ],
    newRecipe: [
        {
            name: 'Name1',
            img: '/assests/new.png',
            ingredients: ['i1', 'i2'],
            steps: ['s1', 's2'],
            _id: '0002',
            _ownerId: '0001'
        }
    ]

}

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

let browser;
let context;
let page;

describe('E2E tests', function () {
    this.timeout(6000);

    before(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 500 });
        // browser = await chromium.launch();
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

    describe('Catalog', function () {
        it('loads and renders content from API', async () => {
            page.route('**' + endpoints.recipes + '**', route => route.fulfill(json(mockData.list)));

            await page.goto(host);
            await page.click('text=Catalog');

            const titles = await page.$$eval('article.preview h2', t => t.map(s => s.textContent));
            expect(titles.length).to.equal(3);
            expect(titles[0]).to.contains('Easy Lasagna');
            expect(titles[1]).to.contains('Grilled Duck Fillet');
            expect(titles[2]).to.contains('Roast Trout');
        });

        it('Displays the recipe details', async () => {
            page.route('**' + endpoints.recipes + '**', route => route.fulfill(json(mockData.list)));
            page.route('**' + endpoints.recipe_by_id + '**', route => route.fulfill(json(mockData.details)));

            await page.goto(host);
            await page.click('text=Roast Trout');

            const content = await page.textContent('article');
            expect(content).to.contains('Roast Trout');

            expect(content).to.contains('Ingredients');
            expect(content).to.contains('4 cups Ingredient 1');
            expect(content).to.contains('1 tbsp Ingredient 2');
            expect(content).to.contains('1 tbsp Ingredient 3');
            expect(content).to.contains('25 g Ingredient 5');

            expect(content).to.contains('Preparation');
            expect(content).to.contains('Prepare ingredients');
            expect(content).to.contains('Mix ingredients');
            expect(content).to.contains('Cook until done');
        });
    });

    describe('Authentication', function () {
        it('Register makes correct API call', async () => {
            const user = mock.users[0];
            const endpoint = '**' + endpoints.register;
            page.route(endpoint, route => route.fulfill(json(user)));

            await page.goto(host);
            await page.click('text=Register');

            await page.waitForSelector('form');
            await page.fill('[name="email"]', user.email);
            await page.fill('[name="password"]', user.password);
            await page.fill('[name="rePass"]', user.password);

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            expect(postData.email).to.equal(user.email);
            expect(postData.password).to.equal(user.password);

            const logoutBtn = await page.textContent('#logoutBtn');
            expect(logoutBtn).to.equal('Logout');
        });

        it('login makes correct API call', async () => {
            const user = mock.users[0];
            const endpoint = '**' + endpoints.login;
            page.route(endpoint, route => route.fulfill(json(user)));

            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');
            await page.fill('[name="email"]', user.email);
            await page.fill('[name="password"]', user.password);

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            expect(postData.email).to.equal(user.email);
            expect(postData.password).to.equal(user.password);

            const logoutBtn = await page.textContent('#logoutBtn');
            expect(logoutBtn).to.equal('Logout');
        });
    });

    describe.only('CRUD Operations', () => {
        /* Login user */
        const user = mock.users[0];

        beforeEach(async () => {
            const endpoint = '**' + endpoints.login;
            page.route(endpoint, route => route.fulfill(json(user)));

            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');
            await page.fill('[name="email"]', user.email);
            await page.fill('[name="password"]', user.password);

            await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[type="submit"]')
            ]);
        });


        it('create makes correct API call for logged in user', async () => {
            const newRecipe = mock.newRecipe[0];
            const endpoint = '**' + endpoints.create;
            page.route(endpoint, route => route.fulfill(json(newRecipe)));

            await page.click('text=Create Recipe');

            await page.waitForSelector('form');
            await page.fill('[name="name"]', newRecipe.name);
            await page.fill('[name="img"]', newRecipe.img);
            await page.fill('[name="ingredients"]', newRecipe.ingredients.join('\n'));
            await page.fill('[name="steps"]', newRecipe.steps.join('\n'));

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            expect(postData.name).to.equal(newRecipe.name);
            expect(postData.img).to.equal(newRecipe.img);
            expect(postData.ingredients).to.deep.equal(newRecipe.ingredients);
            expect(postData.steps).to.deep.equal(newRecipe.steps);

            page.goto(host);
            await page.click('text=Name1');

            const content = await page.textContent('article');
            expect(content).to.contains('Name1');

            expect(content).to.contains('Ingredients');
        });

        it('author sees edit and delete buttons', async () => {
            
        });

        it('edit makes correct API call for logged in user', async () => {
        });
    });
});
