const mongoose = require('mongoose');
const Article = require('../models/Article');
const User = require('../models/User')

describe('Player Model Tests', () => {
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
        await mongoose.disconnect();
    });
    
    test('find all articles', async () => {
        let article = await Article.find()
        expect(article != undefined)
    });
    test('find specific article', async () => {
        let article = await Article.findOne({title: 'Test1'})
        expect(article.title).toBe("Test1")

    });
    
});