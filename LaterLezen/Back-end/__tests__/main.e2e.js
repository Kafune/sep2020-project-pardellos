const puppeteer = require('puppeteer')
jest.setTimeout(120000)

xdescribe('Laterlezer tests', () => {
  it('should register a user', () => {

  })
  let theBrowser, thePage;

  beforeAll(async () => {
    setTimeout(10000)
    theBrowser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      defaultViewport: null,
      args: [`--window-size=1920,1080`]
    })
    thePage = await theBrowser.newPage()
    await thePage.goto('http://localhost:3000/');
  })
  
  afterAll(async () => {
    await thePage.waitFor(5000)
    await theBrowser.close();
  })

  test('User tries to register a new account, where the passwords do not match', async () => {
    let email = 'donaldtrump@americagreatagain.com'
    let firstname = 'donald'
    let lastname = 'trump'
    let password = 'ditiseenwachtwoord';
    let password2 = 'ditishettweedewachtwoord'
    await thePage.goto('http://localhost:3000/register');
    await thePage.waitFor(1000)

    await thePage.waitFor("input[name=register]");
    await thePage.type('input[name=email]', email)
    await thePage.type('input[name=firstname]', firstname)
    await thePage.type('input[name=lastname]', lastname)
    await thePage.type('input[name=password]', password)
    await thePage.type('input[name=confirmpassword]', password2)

    // click on the register button
    await thePage.click('input[name="register"]')
  })
  
  test('User registers a new account that already exists', async () => {

    const password = 'ditiseenwachtwoord'
    
    await thePage.waitFor(1500)
    // fill all the input fields with text
    await thePage.$eval('input[name=password]', (input, value) => input.value = value, '')
    await thePage.$eval('input[name=confirmpassword]', (input, value) => input.value = value, '')
    await thePage.type('input[name=password]', password)
    await thePage.type('input[name=confirmpassword]', password)

    // click on the register button
    await thePage.click('input[name="register"]')
  })

  test('User registers a new account that already exists', async () => {
    let email = 'joebiden@usa.com'
    
    await thePage.waitFor(1500)

    //fill all test field
    await thePage.waitFor("input[name=register]");

    await thePage.$eval('input[name=email]', (input, value) => input.value = value, '')

    await thePage.type('input[name=email]', email)
  
    await thePage.click('input[name="register"]')
  })


  xtest('User navigates to Login',async () => {
      await thePage.$eval('a[href="/login"]', el => el.click())

  })
  xtest('User logs in the webpage', async () => {
    let email = 'test@test.net'
    let password = 'test123'

    await thePage.waitFor('a[textContent="Log in"]')
    await thePage.type('input#email', email)
  })
})