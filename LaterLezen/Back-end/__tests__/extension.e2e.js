const mongoose = require("mongoose");
const User = require("../models/User");
const puppeteer = require("puppeteer");

describe("Laterlezer extension e2e tests", async () => {
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
        // const wrongEmail = "notextension@test.com";
        // const wrongPassword = "1234qwerasdfzxcv";

        // eventuele extra: Check of een gebruiker al ingelogd is of niet.
        // weet niet of chromium een hele andere cookie/sessie heeft.
        // const checkArticleButton = await thePage.waitForSelector(".add-article", {visible: true})
        // console.log(checkArticleButton)

        await thePage.type('input[class="email"]', testEmail)
        // await thePage.type('input[class="password"]', wrongPassword)

        await thePage.click('button[id="ext-login-button"]')
        await thePage.waitForTimeout(3000);

    });

    test("User logs in with the correct credentials", async() => {
        await thePage.type('input[class="password"]', testPassword)

        await thePage.click('button[id="ext-login-button"]')
        await thePage.waitForTimeout(3000);
    })
})