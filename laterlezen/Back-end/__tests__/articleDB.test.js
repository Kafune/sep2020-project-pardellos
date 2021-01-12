const mongoose = require('mongoose');
const Article = require('../models/Article');
const User = require('../models/User')

xdescribe('Article Model Tests', () => {
    beforeAll(async () => {
         await mongoose.connect('mongodb+srv://Glenn:LaterLezen@laterlezen.tkmyn.mongodb.net/LaterLezen?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        await Article.create({title: 'Test1'}) 
        await Article.create({title: 'Test2'}) 
        await Article.create({title: 'Test3'}) 

        await User.create({email: 'testje@test.nl', password: '123'})
    });

    
    afterAll(async () => {
        await Article.deleteOne({title: 'Test1'})
        await Article.deleteOne({title: 'Test2'})
        await Article.deleteOne({title: 'Test3'})
        await User.deleteOne({email: 'testje@test.nl'})
        await mongoose.disconnect();
    });
    
    
    test('find specific article', async () => {
        let article = await Article.findOne({title: 'Test1'})
        expect(article.title).toBe("Test1")

    });

    test('check if article url is a valid article', async () => {
        const { extract } = require("article-parser");
        const url = 'https://www.youtube.com/watch?v=jXZAbnn1kTU';

        return extract(url)
        .then(data => {
            expect(data).not.toBeNull()
        })
    })

    test('Keep part of metadata of an article filled, even when empty', async () => {
        const testArticle = {
            "tags": [],
            "url": "https://nos.nl/artikel/2358829-d66-en-vvd-willen-opheldering-over-blokkering-lid-euthanasiecommissie.html",
            "title": "Dit is een titel",
            "excerpt": "Dit is een beschrijving",
            "image": "https://cdn.nos.nl/image/2020/11/05/689236/xxl.jpg",
            "content": "Lorum ipson",
            "author": "peter",
            "source": "nos.nl",
        }

        let newArticle = new Article(testArticle)
        let userInputTitle = "Dit is een test titel";
        let userInputAuthor = "Test auteur";
        let userInputDescription = "";
        let userInputSource = "Testwebsite.nl"

        if (!userInputTitle == "") newArticle.title = userInputTitle
        if (!userInputAuthor == "") newArticle.author = userInputAuthor
        if (!userInputDescription == "") newArticle.excerpt = userInputDescription
        if (!userInputSource == "") newArticle.source = userInputSource

        //Should pass, cause it should keep the old description
        expect(newArticle.excerpt).toBe("Dit is een beschrijving")
    })
    
});