const mongoose = require("mongoose");
const User = require("../models/User");
const puppeteer = require("puppeteer");

describe("Laterlezer extension e2e tests", () => {
    let theBrowser, thePage;

    jest.setTimeout(100000);

    //create account

    //test credentials
    const testEmail = "extensietest@test.com";
    const testFirstName = "extensie";
    const testLastName = "tester";
    const testPassword = "extensievetest";

    beforeAll(async () => {
        //create account before testing extension
        await mongoose.connect(
            "mongodb+srv://Glenn:LaterLezen@laterlezen.tkmyn.mongodb.net/LaterLezen?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            }
        )

        await User.create({
            email: testEmail,
            firstname: testFirstName,
            lastname: testLastName,
            password: testPassword,
        });



        //puppeteer
        // await fetch("http://localhost:4000/testing/set");
        theBrowser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            defaultViewport: null,
            devtools: true,
            args: [`--window-size=1920,1080`],
        });
        thePage = await theBrowser.newPage();
        await thePage.goto("http://localhost:3001/");
    })

    afterAll(async () => {
        // await fetch("http://localhost:4000/testing/reset");
        await User.deleteOne({ email: testEmail });
        await mongoose.disconnect();

        await theBrowser.close();

    });

    test("User logs in with empty password", async () => {
        await thePage.type('input[class="email"]', testEmail)

        await thePage.click('button[id="ext-login-button"]')
        await thePage.waitForTimeout(3000);

    });

    test("User logs in with the correct credentials", async () => {
        await thePage.type('input[class="password"]', testPassword)
        await thePage.click('button[id="ext-login-button"]')

        //show message before moving on
        await thePage.waitForTimeout(3000);
    })
    test("User tries to add an article with the wrong URL format", async () => {
        const wrongURL = "dit is geen geldige url!";

        await thePage.type('input[id="ext-url"]', wrongURL)
        await thePage.click('button[id="ext-save-article"]')

        //show message before moving on
        await thePage.waitForTimeout(3000);
    })

    test("User tries to add an article with the correct URL format", async() => {
        await thePage.$eval(
            "input[id=ext-url]",
            (input, value) => (input.value = value),
            ""
          );
        await thePage.type('input[id="ext-url"]', "https://www.nu.nl/verkiezingen-vs/6092489/trump-accepteert-verkiezingsuitslag-en-is-woedend-op-capitool-bestormers.html")
        await thePage.type('input[id="ext-title"]', "Trump is woedend op Capitool-bestormers")
        await thePage.click('button[id="ext-save-article"]')
        await thePage.waitForTimeout(3000);
    })

    test("User logs out", async () => {
        await thePage.click('button[id="ext-logout"]')
        await thePage.waitForTimeout(3000);
    })
})