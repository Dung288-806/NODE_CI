const puppeteer = require("puppeteer");

// let browser, page;

// beforeEach(async () => {
//     jest.setTimeout(1000000);
//     browser = await puppeteer.launch({
//         headless: false
//     })
//     page = await browser.newPage()
//     await page.goto('http://localhost:3000')
// })

// afterEach(async () => {
//     await browser.close()
// })

// test('We can launch a browser', async () => {
//     const text = await page.$eval("a.brand-logo", el => el.innerHTML);
//     expect(text).toEqual("Blogster");
// })

test('Should sum to equal', () => {
    const sum = 1 + 3
    expect(sum).toEqual(4)
})
test('Should Subtract to equal', () => {
    const sum = 3 - 1
    expect(sum).toEqual(4)
})