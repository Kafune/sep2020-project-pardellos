const puppeteer = require('puppeteer')

describe('Laterlezer tests', () => {

  let theBrowser, thePage;

  beforeAll(async () => {
    theBrowser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      defaultViewport: null,
      args: [`--window-size=1920,1080`]
    })
    thePage = await theBrowser.newPage()
    await thePage.goto('http://localhost:3000/');
  })

  afterAll(async () => {
    await theBrowser.close();
  })

  
  xtest('User navigates to Register', async () => {
    await thePage.$eval('a[href="/register"]', el => el.click())
  })
  xtest('User registers a new account', async () => {
    let email = 'test@test.net'
    let firstname = 'test'
    let lastname = 'tester'
    let password = 'test123'
    let confirmpassword = 'test123'

    //fill all test field
    await thePage.waitFor("input[name=register]");
    await thePage.$eval('input[name=email]', (input, value) => input.value = value, email)
    await thePage.$eval('input[name=firstname]', (input, value) => input.value = value, firstname)
    await thePage.$eval('input[name=lastname]', (input, value) => input.value = value, lastname)
    await thePage.$eval('input[name=password]', (input, value) => input.value = value, password)
    await thePage.$eval('input[name=confirmpassword]', (input, value) => input.value = value, confirmpassword)

    await thePage.click('input[name="register"]')
    // await thePage.$eval('input[name="register"]', element => element.click())
  })


  test('User navigates to Login',async () => {
      await thePage.$eval('a[href="/login"]', el => el.click())

  })
  test('User logs in the webpage', async () => {
    let email = 'test@test.net'
    let password = 'test123'

    await thePage.waitFor('a[textContent="Log in"]')
    await thePage.type('input#email', email)
  })




})