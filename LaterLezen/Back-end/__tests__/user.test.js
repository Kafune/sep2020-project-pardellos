const mongoose = require("mongoose");

const passport = require("passport");
const User = require("../models/User");
const Article = require("../models/Article");

describe("user related tests", () => {
  const testEmail = "test123456783568@test.com";
  const testFirstName = "test";
  const testLastName = "tester";
  const testPassword = "test";

  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://Glenn:LaterLezen@laterlezen.tkmyn.mongodb.net/LaterLezen?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
  });
  beforeEach(async () => {
    await User.create({
      email: testEmail,
      firstname: testFirstName,
      lastname: testLastName,
      password: testPassword,
    });
  });

  //check if email follows format
  test("email format", async () => {
    let testUser = await User.findOne({
      email: testEmail,
    }).lean();

    let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    expect(testUser.email).toMatch(emailFormat);
  });

  //check if pass is not saved as plain text
  test("password hashing", async () => {
    let testUser = await User.findOne({
      email: testEmail,
    }).lean();

    expect(testUser.password).not.toBe("test");
  });

  test("add correct article object to user", async () => {
    let testUser = await User.findOne({
      email: testEmail,
    });

    const testArticle = {
      tags: [],
      status: "public",
      read: false,
      url:
        "https://nos.nl/artikel/2358829-d66-en-vvd-willen-opheldering-over-blokkering-lid-euthanasiecommissie.html",
      title:
        "D66 en VVD willen opheldering over blokkering lid euthanasiecommissie",
      description:
        "Minister Grapperhaus stemt niet in met de benoeming van Miriam de Bontridder, raadsheer-plaatsvervanger bij het gerechtshof in Amsterdam. ",
      links: [
        "https://nos.nl/artikel/2358829-d66-en-vvd-willen-opheldering-over-blokkering-lid-euthanasiecommissie.html",
        "https://amp.nos.nl/artikel/2358829-d66-en-vvd-willen-opheldering-over-blokkering-lid-euthanasiecommissie.html",
        "https://nos.nl/l/2358829",
      ],
      image: "https://cdn.nos.nl/image/2020/11/05/689236/xxl.jpg",
      content:
        '<div><div><picture><img src="https://cdn.nos.nl/image/2020/11/05/689236/1024x576a.jpg" alt /></picture><span>Minister Grapperhaus </span><span>ANP</span><span>zoom in</span></div><div><div><div><span>NOS Nieuws</span> <span><span>•</span> <span><a href="https://nos.nl/nieuws/binnenland/">Binnenland</a> <span>•</span></span><span><a href="https://nos.nl/nieuws/politiek/">Politiek</a> </span></span><span><span>•</span> vandaag, 09:56</span> <span><span>•</span> Aangepast vandaag, 11:11</span></div><h1>D66 en VVD willen opheldering over blokkering lid euthanasiecommissie</h1></div></div></div><div><div><div><div><div><p>Coalitiepartijen D66 en VVD willen opheldering van CDA-minister Grapperhaus (Justitie en Veiligheid) over zijn weigering om een lid van een regionale euthanasiecommissie te benoemen. Het is hoogst ongebruikelijk dat een minister de benoeming blokkeert. D66 wil hier vanmiddag mondelinge Kamervragen over stellen.</p><p>Grapperhaus wil niet dat Miriam de Bontridder, raadsheer-plaatsvervanger bij het gerechtshof in Amsterdam, tot een van de toetsingscommissies toetreedt. Het is niet duidelijk waarom hij zijn veto uitspreekt; het ministerie wil er niets over zeggen.</p><p>De Bontridder was tot vorig jaar bestuurslid van De Einder, een organisatie die mensen adviseert hoe ze op een legale manier zonder betrokkenheid van een arts uit het leven kunnen stappen. Ze is groot voorstander van euthanasie en ze spreekt zich daarover ook geregeld in het openbaar uit. Eerder dit jaar bekritiseerde ze leider van de ChristenUnie Gert-Jan Segers, die tegen euthanasie is.</p><h2>Zeer gekwalificeerde jurist</h2><p>Er zijn vijf regionale toetsingscommissies. In elke commissie zitten een jurist, een arts en een ethicus. Zij oordelen of een arts bij een euthanasie zorgvuldig gehandeld heeft. Als ze concluderen dat een arts onzorgvuldig is geweest of als er twijfels zijn, gaat de zaak voor onderzoek naar het Openbaar Ministerie.</p><p>De Bontridder was al voorgedragen door de sollicitatiecommissie, maar minister Grapperhaus gaat er dus voor liggen. "Ze is een zeer gekwalificeerde jurist en dus met grote overtuiging voorgedragen, maar het is het recht van de minister om te besluiten iemand niet te benoemen", zegt Jacob Kohnstamm, coördinerend voorzitter van de regionale toetsingscommissies. Kohnstamm gaat Grapperhaus vragen waarom De Bontridder geen lid mag worden.</p><p>D66-Tweede Kamerlid Pia Dijkstra spreekt van een ernstige kwestie en vraagt zich af of De Bontridder is geweigerd omdat ze voor De Einder heeft gewerkt.</p></div></div><div><div><div><a href="https://twitter.com/piadijkstra/status/1333673294478921728"><div><img src="https://pbs.twimg.com/profile_images/1165895489138647040/J8kdZw0-_normal.jpg" alt="profielfoto" /></div><div><span>Pia Dijkstra <span>Gebruiker geverifieerd door Twitter</span></span><span>@piadijkstra</span></div><span></span><p>Waarom blokkeert Grapperhaus benoeming rechter in toetsingscommissie euthanasie?Omdat ze bestuurslid de Einder is geweest? Ernstige kwestie, nog niet eerder voorgekomen. Ik stel Kamervragen. https://t.co/09XYNjHvSr</p>5 uur geleden</a></div></div></div></div></div></div><div><div><div><div><p>Deel dit artikel:</p><ul><li><a href="https://twitter.com/share?text=D66%20en%20VVD%20willen%20opheldering%20over%20blokkering%20lid%20euthanasiecommissie&amp;url=https://www.nos.nl/l/t/2358829&amp;via=NOS"> Twitter</a></li><li><a href="http://www.facebook.com/sharer.php?u=https://www.nos.nl/l/f/2358829&amp;t=D66%20en%20VVD%20willen%20opheldering%20over%20blokkering%20lid%20euthanasiecommissie"> Facebook</a></li><li><a href="mailto:?subject=D66%20en%20VVD%20willen%20opheldering%20over%20blokkering%20lid%20euthanasiecommissie&amp;body=https://www.nos.nl/l/m/2358829"> Email</a></li><li><a> WhatsApp</a></li></ul></div></div></div></div><section><h4>STER reclame</h4></section><div><ol><li><a href="https://nos.nl/artikel/2358838-europese-vaccinbeoordeling-begonnen-uitkomsten-mogelijk-deze-maand.html"><div><img src="https://cdn.nos.nl/image/2020/11/23/693786/512x288a.jpg" alt /></div><div><h2>Europese vaccinbeoordeling begonnen, uitkomsten mogelijk deze maand</h2><p>Het medicijnagentschap EMA bekijkt of de vaccins effectief zijn en voldoen aan de veiligheidseisen. De beoordeling wordt mogelijk deze maand nog afgerond.</p></div></a></li><li><a href="https://nos.nl/artikel/2358849-de-ideale-oplossing-voor-circusolifant-buba-lijkt-niet-te-bestaan.html"><div><img src="https://cdn.nos.nl/image/2020/11/20/692992/512x288a.jpg" alt /></div><div><h2>De ideale oplossing voor circusolifant Buba lijkt niet te bestaan</h2><p>Mag olifant Buba bij Circus Freiwald blijven, of niet? Over deze langslepende kwestie stemt de Tweede Kamer straks.</p></div></a></li><li><a href="https://nos.nl/artikel/2358829-d66-en-vvd-willen-opheldering-over-blokkering-lid-euthanasiecommissie.html"><div><img src="https://cdn.nos.nl/image/2020/11/05/689236/512x288a.jpg" alt /></div><div><h2>D66 en VVD willen opheldering over blokkering lid euthanasiecommissie</h2><p>Minister Grapperhaus stemt niet in met de benoeming van Miriam de Bontridder, raadsheer-plaatsvervanger bij het gerechtshof in Amsterdam.</p></div></a></li></ol></div>',
      author: "",
      source: "nos.nl",
      published: "",
      ttr: "87",
      createdAt: "2020-12-01T12:29:06.216Z",
      __v: 0,
    };

    let newArticle = new Article(testArticle);
    newArticle.save();
    testUser.articles.push(newArticle);

    expect(testUser.articles[0].title).toBe(
      "D66 en VVD willen opheldering over blokkering lid euthanasiecommissie"
    );
  });

  test("add tag to user", async () => {
    let testUser = await User.findOne({
      email: testEmail,
    }).lean();

    let expectedTags = ["test", "tag", "voetbal", "sport"];

    testUser.tags.push("test", "tag", "voetbal", "sport");

    expect(testUser.tags).toEqual(expectedTags);
  });
  test("lowercase tags and ascending sorting", async () => {
    let inputTags = ["bt", "cd", "ab", "ba", "ac"];

    inputTags.map(function (value) {
      return value.toLowerCase();
    });

    let sortedTags = inputTags.sort();

    expect(sortedTags).toEqual(["ab", "ac", "ba", "bt", "cd"]);
  });
  test("check for duplicate tags", async () => {
    let inputTags = [
      "bt",
      "cd",
      "ab",
      "ba",
      "ac",
      "ac",
      "ac",
      "cd",
      "ba",
      "bt",
    ];
    let concatTags = inputTags.concat(inputTags);

    const allUniqueTags = new Set(concatTags);

    concatTags = [...allUniqueTags];

    expect(concatTags).toEqual(["bt", "cd", "ab", "ba", "ac"]);
  });
  test("add article without any authentication", async () => {
    //TODO: Test this
  });

  test("add new theme to user", async () => {
    let testUser = await User.findOne({
      email: testEmail,
    }).lean();
    let preference = "dark";
    if (
      preference === "default" ||
      preference === "typewriter" ||
      preference === "dark" ||
      preference === "bluegrey" ||
      preference === "darkblue"
    ) {
      testUser.preferences = preference;
    }

    expect(testUser.preferences).toEqual(preference);
  });

  test("theme stays on the current theme when changing it to a invalid theme", async () => {
    let testUser = await User.findOne({
      email: testEmail,
    }).lean();
    let preference = "orange";

    if (
      preference === "default" ||
      preference === "typewriter" ||
      preference === "dark" ||
      preference === "bluegrey" ||
      preference === "darkblue"
    ) {
      testUser.preferences = preference;
    }

    expect(testUser.preferences).toEqual("default");
  });

  test("Get all authors from a user",async() => {
    let newArticle = new Article();
    newArticle.author = "john kennedy";
    newArticle.title = "joi";
    newArticle.save((err) => {
        console.log(err)
        User.findOne({email: testEmail}, (err, user)=>{
            console.log(err)
            user.articles.push(newArticle);
            user.save();
            User.findOne({ email: testEmail })
            .populate("articles")
            .exec((err, document) => {
                console.log(err)
                console.log(document.articles)
                let author = document.articles[0].author
                console.log("auteur" + author);
              expect(author.toBe("john kennedy"))
            });
        })
        
      
    });

    // Test the function
  });

  xtest("Find a specific author", async () => {
    // Create specific data
    let testUser = await User.findOne({
      email: testEmail,
    });
    let author = "Jan Jansen";

    const testArticle1 = {
      tags: [],
      status: "public",
      read: false,
      url:
        "https://nos.nl/artikel/2358829-d66-en-vvd-willen-opheldering-over-blokkering-lid-euthanasiecommissie.html",
      title:
        "D66 en VVD willen opheldering over blokkering lid euthanasiecommissie",
      description:
        "Minister Grapperhaus stemt niet in met de benoeming van Miriam de Bontridder, raadsheer-plaatsvervanger bij het gerechtshof in Amsterdam. ",
      links: [
        "https://nos.nl/artikel/2358829-d66-en-vvd-willen-opheldering-over-blokkering-lid-euthanasiecommissie.html",
        "https://amp.nos.nl/artikel/2358829-d66-en-vvd-willen-opheldering-over-blokkering-lid-euthanasiecommissie.html",
        "https://nos.nl/l/2358829",
      ],
      image: "https://cdn.nos.nl/image/2020/11/05/689236/xxl.jpg",
      content:
        '<div><div><picture><img src="https://cdn.nos.nl/image/2020/11/05/689236/1024x576a.jpg" alt /></picture><span>Minister Grapperhaus </span><span>ANP</span><span>zoom in</span></div><div><div><div><span>NOS Nieuws</span> <span><span>•</span> <span><a href="https://nos.nl/nieuws/binnenland/">Binnenland</a> <span>•</span></span><span><a href="https://nos.nl/nieuws/politiek/">Politiek</a> </span></span><span><span>•</span> vandaag, 09:56</span> <span><span>•</span> Aangepast vandaag, 11:11</span></div><h1>D66 en VVD willen opheldering over blokkering lid euthanasiecommissie</h1></div></div></div><div><div><div><div><div><p>Coalitiepartijen D66 en VVD willen opheldering van CDA-minister Grapperhaus (Justitie en Veiligheid) over zijn weigering om een lid van een regionale euthanasiecommissie te benoemen. Het is hoogst ongebruikelijk dat een minister de benoeming blokkeert. D66 wil hier vanmiddag mondelinge Kamervragen over stellen.</p><p>Grapperhaus wil niet dat Miriam de Bontridder, raadsheer-plaatsvervanger bij het gerechtshof in Amsterdam, tot een van de toetsingscommissies toetreedt. Het is niet duidelijk waarom hij zijn veto uitspreekt; het ministerie wil er niets over zeggen.</p><p>De Bontridder was tot vorig jaar bestuurslid van De Einder, een organisatie die mensen adviseert hoe ze op een legale manier zonder betrokkenheid van een arts uit het leven kunnen stappen. Ze is groot voorstander van euthanasie en ze spreekt zich daarover ook geregeld in het openbaar uit. Eerder dit jaar bekritiseerde ze leider van de ChristenUnie Gert-Jan Segers, die tegen euthanasie is.</p><h2>Zeer gekwalificeerde jurist</h2><p>Er zijn vijf regionale toetsingscommissies. In elke commissie zitten een jurist, een arts en een ethicus. Zij oordelen of een arts bij een euthanasie zorgvuldig gehandeld heeft. Als ze concluderen dat een arts onzorgvuldig is geweest of als er twijfels zijn, gaat de zaak voor onderzoek naar het Openbaar Ministerie.</p><p>De Bontridder was al voorgedragen door de sollicitatiecommissie, maar minister Grapperhaus gaat er dus voor liggen. "Ze is een zeer gekwalificeerde jurist en dus met grote overtuiging voorgedragen, maar het is het recht van de minister om te besluiten iemand niet te benoemen", zegt Jacob Kohnstamm, coördinerend voorzitter van de regionale toetsingscommissies. Kohnstamm gaat Grapperhaus vragen waarom De Bontridder geen lid mag worden.</p><p>D66-Tweede Kamerlid Pia Dijkstra spreekt van een ernstige kwestie en vraagt zich af of De Bontridder is geweigerd omdat ze voor De Einder heeft gewerkt.</p></div></div><div><div><div><a href="https://twitter.com/piadijkstra/status/1333673294478921728"><div><img src="https://pbs.twimg.com/profile_images/1165895489138647040/J8kdZw0-_normal.jpg" alt="profielfoto" /></div><div><span>Pia Dijkstra <span>Gebruiker geverifieerd door Twitter</span></span><span>@piadijkstra</span></div><span></span><p>Waarom blokkeert Grapperhaus benoeming rechter in toetsingscommissie euthanasie?Omdat ze bestuurslid de Einder is geweest? Ernstige kwestie, nog niet eerder voorgekomen. Ik stel Kamervragen. https://t.co/09XYNjHvSr</p>5 uur geleden</a></div></div></div></div></div></div><div><div><div><div><p>Deel dit artikel:</p><ul><li><a href="https://twitter.com/share?text=D66%20en%20VVD%20willen%20opheldering%20over%20blokkering%20lid%20euthanasiecommissie&amp;url=https://www.nos.nl/l/t/2358829&amp;via=NOS"> Twitter</a></li><li><a href="http://www.facebook.com/sharer.php?u=https://www.nos.nl/l/f/2358829&amp;t=D66%20en%20VVD%20willen%20opheldering%20over%20blokkering%20lid%20euthanasiecommissie"> Facebook</a></li><li><a href="mailto:?subject=D66%20en%20VVD%20willen%20opheldering%20over%20blokkering%20lid%20euthanasiecommissie&amp;body=https://www.nos.nl/l/m/2358829"> Email</a></li><li><a> WhatsApp</a></li></ul></div></div></div></div><section><h4>STER reclame</h4></section><div><ol><li><a href="https://nos.nl/artikel/2358838-europese-vaccinbeoordeling-begonnen-uitkomsten-mogelijk-deze-maand.html"><div><img src="https://cdn.nos.nl/image/2020/11/23/693786/512x288a.jpg" alt /></div><div><h2>Europese vaccinbeoordeling begonnen, uitkomsten mogelijk deze maand</h2><p>Het medicijnagentschap EMA bekijkt of de vaccins effectief zijn en voldoen aan de veiligheidseisen. De beoordeling wordt mogelijk deze maand nog afgerond.</p></div></a></li><li><a href="https://nos.nl/artikel/2358849-de-ideale-oplossing-voor-circusolifant-buba-lijkt-niet-te-bestaan.html"><div><img src="https://cdn.nos.nl/image/2020/11/20/692992/512x288a.jpg" alt /></div><div><h2>De ideale oplossing voor circusolifant Buba lijkt niet te bestaan</h2><p>Mag olifant Buba bij Circus Freiwald blijven, of niet? Over deze langslepende kwestie stemt de Tweede Kamer straks.</p></div></a></li><li><a href="https://nos.nl/artikel/2358829-d66-en-vvd-willen-opheldering-over-blokkering-lid-euthanasiecommissie.html"><div><img src="https://cdn.nos.nl/image/2020/11/05/689236/512x288a.jpg" alt /></div><div><h2>D66 en VVD willen opheldering over blokkering lid euthanasiecommissie</h2><p>Minister Grapperhaus stemt niet in met de benoeming van Miriam de Bontridder, raadsheer-plaatsvervanger bij het gerechtshof in Amsterdam.</p></div></a></li></ol></div>',
      author: author,
      source: "nos.nl",
      published: "",
      ttr: "87",
      createdAt: "2020-12-01T12:29:06.216Z",
      __v: 0,
    };

    let newArticle = new Article(testArticle1);
    testUser.articles.push(newArticle);

    // Test the function
  });
});
