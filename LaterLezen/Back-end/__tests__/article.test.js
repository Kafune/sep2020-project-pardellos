const Article = require('../models/Article');

xdescribe('Article related tests', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://Glenn:LaterLezen@laterlezen.tkmyn.mongodb.net/LaterLezen?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    })
    beforeEach(async () => {
        await Article.create({

        })
    })

    afterEach(async () => {
        await Article.deleteOne({

        })
    })

    afterAll(async () => {
        await mongoose.disconnect();
    })

    test('', async () => {

    })
})
