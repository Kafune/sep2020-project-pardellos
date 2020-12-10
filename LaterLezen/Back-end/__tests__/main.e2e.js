const puppeteer = require("puppeteer");
jest.setTimeout(250000);

describe("Laterlezer tests", () => {
  it("should register a user", () => {});
  let theBrowser, thePage;

  beforeAll(async () => {
    theBrowser = await puppeteer.launch({
      headless: false,
      slowMo: 25,
      defaultViewport: null,
      args: [`--window-size=1920,1080`],
    });
    thePage = await theBrowser.newPage();
    await thePage.goto("http://localhost:3000/");
  });

  //   afterEach(async () => {

  // })

  afterAll(async () => {
    await theBrowser.close();
  });

  test("User tries to register a new account, where the passwords do not match", async () => {
    let email = "donaldtrump@americagreatagain.com";
    let firstname = "donald";
    let lastname = "trump";
    let password = "ditiseenwachtwoord";
    let password2 = "ditishettweedewachtwoord";
    await thePage.goto("http://localhost:3000/register");
    await thePage.waitFor(1000);

    await thePage.waitFor("input[name=register]");
    await thePage.type("input[name=email]", email);
    await thePage.type("input[name=firstname]", firstname);
    await thePage.type("input[name=lastname]", lastname);
    await thePage.type("input[name=password]", password);
    await thePage.type("input[name=confirmpassword]", password2);

    // click on the register button
    await thePage.click('input[name="register"]');
  });

  test("User registers a new account that already exists", async () => {
    const password = "ditiseenwachtwoord";

    await thePage.waitFor(1500);
    // fill all the input fields with text
    await thePage.$eval(
      "input[name=password]",
      (input, value) => (input.value = value),
      ""
    );
    await thePage.$eval(
      "input[name=confirmpassword]",
      (input, value) => (input.value = value),
      ""
    );
    await thePage.type("input[name=password]", password);
    await thePage.type("input[name=confirmpassword]", password);

    // click on the register button
    await thePage.click('input[name="register"]');
  });

  test("User registers a new account that does not exist yet", async () => {
    let email = "joebiden@usa.com";

    await thePage.waitFor(1500);

    //fill all test field
    await thePage.waitFor("input[name=register]");

    await thePage.$eval(
      "input[name=email]",
      (input, value) => (input.value = value),
      ""
    );

    await thePage.type("input[name=email]", email);

    await thePage.click('input[name="register"]');
  });

  test("User clicks the hamburger menu and selects the option to safe an article", async () => {
    let url =
      "https://www.nu.nl/politiek/6095197/horeca-krijgt-wellicht-extra-steun-maar-is-geen-bouwsteen-van-economie.html";
    let title = "horeca krijgt wellicht extra steun";

    await thePage.waitFor(1500);
    await thePage.click('a[id="hamburger"]');
    await thePage.waitFor(1000);
    await thePage.click('i[id="saveArticle"]');
    await thePage.waitFor(1500)
    await thePage.type('input[id="url"]', url)
    await thePage.type('input[id="title"]', title)
    await thePage.waitFor(1000)

    await thePage.click('button[id="saveArticle"]')
    await thePage.waitFor(5000)
    await thePage.click('a[id="hamburger"]');
    await thePage.waitFor(1500)
    await thePage.click('i[id="dashboard"]');
    await thePage.waitFor(3000)
  });


  test('user clicks an article to read' , async () => {
    await thePage.waitFor(1500);
    for(let i = 0; i < 12; i++){
      await thePage.keyboard.press('ArrowDown');
    }
    await thePage.click('a[id="seeArticle"]')
    await thePage.waitFor(2500)

    for(let i = 0; i < 20; i++){
      await thePage.keyboard.press('ArrowDown');
    }
    await thePage.waitFor(3000)

    await thePage.click('button[id="preferenceButton"]');
    await thePage.waitFor(1500);
    await thePage.click('div[id="typewriter"]')
    await thePage.waitFor(1500)
    await thePage.click('div[id="dark"]')
    await thePage.waitFor(1500)
    await thePage.click('div[id="cancelPreferences"]')
    await thePage.waitFor(1500)
    await thePage.focus('div[id="root"]')
    await thePage.click('div[id="root"]')
    await thePage.click('div[id="root"]')
    await thePage.waitFor(1500)
    await thePage.click('button[id="preferenceButton"]');
    await thePage.waitFor(1500)
    await thePage.click('div[id="darkblue"]')
    await thePage.waitFor(1000)
    await thePage.click('div[id="savePreferences"]');
    await thePage.waitFor(1000);
    await thePage.click('div[id="root"]')
    await thePage.focus('div[id="root"]')
    await thePage.click('div[id="root"]')
    await thePage.click('div[id="root"]')

    await thePage.waitFor(1000)
    for(let i = 0; i < 60; i++){
      await thePage.keyboard.press('ArrowDown');
    }
    await thePage.waitFor(5000)
    await thePage.focus('a[id="originalArticle"]')
    await thePage.waitFor(2500)
    await thePage.click('a[id="originalArticle"]');
    await thePage.waitFor(2500);
    await thePage.goBack();
    await thePage.waitFor(2500)
    await thePage.click('a[id="hamburger"]');
    await thePage.waitFor(1500)
    await thePage.click('i[id="dashboard"]');
  })


  test('user clicks on edit article in the dashboard' , async () => {
    let title = 'Horeca moet extra steun krijgen van de overheid ivm economische problemen'
    let description = 'het kabinet heeft overlegd over het helpen van de horeca, dit is aangezien de horeca enorm in de problemen zit met schulden.'
    let source = 'nu.nl'
    let author = 'jan-peter balkenende'

    await thePage.waitFor(1500)
    //simulate scroling
    for(let i = 0; i < 12; i++){
      await thePage.keyboard.press('ArrowDown');
    }

    await thePage.waitFor(5000)
    await thePage.click('a[id="editArticle"]');
    await thePage.waitFor(1000)

    for(let i = 0; i < 8; i++){
      await thePage.keyboard.press('ArrowDown');
    }
    await thePage.$eval("input[id=title]",(input, value) => (input.value = value), "");
    await thePage.waitFor(500)
    await thePage.type('input[id="title"]', title)
    await thePage.$eval("input[id=source]",(input, value) => (input.value = value), "");
    await thePage.waitFor(500)
    await thePage.type('input[id="source"]', source)

    await thePage.$eval("textarea[id=description]",(input, value) => (input.value = value), "");
    await thePage.waitFor(500)
    await thePage.type('textarea[id="description"]', description)
    await thePage.$eval("input[id=author]",(input, value) => (input.value = value), "");
    await thePage.waitFor(500)
    await thePage.type('input[id="author"]', author)


    await thePage.click('button[id="confirmChanges"]')
    await thePage.waitFor(2500)

    for(let i = 0; i < 12; i++){
      await thePage.keyboard.press('ArrowDown');
    }
    await thePage.waitFor(5000)
    

  })

  test('User logs out of the LaterLezer app', async () => {
    await thePage.waitFor(1500)
    await thePage.click('a[id="hamburger"]');
    await thePage.waitFor(1000);
    await thePage.click('i[id="logout"]');
    await thePage.waitFor(2500);
  })


  // xtest('User navigates to Login',async () => {
  //     await thePage.$eval('a[href="/login"]', el => el.click())

  // })
  // xtest('User logs in the webpage', async () => {
  //   let email = 'test@test.net'
  //   let password = 'test123'

  //   await thePage.waitFor('a[textContent="Log in"]')
  //   await thePage.type('input#email', email)
  // })
});
