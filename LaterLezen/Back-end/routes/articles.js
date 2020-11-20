const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const pdfjs = require("pdfjs-dist/es5/build/pdf");
pdfjs.workerSrc = "../node_modules/pdfjs-dist/build/pdf.worker.min.js"

/**
   * @type ExpressSocket.
   * @description Retrieves all articles from the DB
   * @param empty
   * @body empty
   * @returns [{article}, {article}, ...]
   * @async
   * @memberof app
   */
router.get("/", async (req, res) => {
  const result = await Article.find({});
  res.send(result);
});

router.get("/pdf", async (req, res) => {
  const PDF_URL = 'http://www.gpslogbook.com/us/Docs/UserManual.pdf'

  function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function (resolve, reject) {
      PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
        // The main trick to obtain the text of the PDF page, use the getTextContent method
        pdfPage.getTextContent().then(function (textContent) {
          var textItems = textContent.items;
          var finalString = "";

          // Concatenate the string of the item to the final string
          for (var i = 0; i < textItems.length; i++) {
            var item = textItems[i];

            finalString += item.str + " ";
          }

          // Solve promise with the text retrieven from the page
          resolve(finalString);
        });
      });
    });
  }



  pdfjs.getDocument(PDF_URL).promise

    .then(pdf => {
      let pdfDocument = pdf;

      let pagesPromises = [];
    
      for (let i = 0; i < pdf.numPages; i++) {
        (pageNumber => {
          pagesPromises.push(getPageText(pageNumber, pdfDocument))
        })(i + 1)
      }

      Promise.all(pagesPromises)
      .then(pagesText => {
        res.send(pagesText)
      })


      
    //   let totalPages = PDFDocumentInstance.numPages;
    //   let pageNum = 1;

    //   getPageText(pageNum, PDFDocumentInstance)
    //   .then(textPage => {
    //     console.log(textPage)
    //   })

    }, (error) => {
      console.error(error);
    }
    )
})

/**
   * @type ExpressSocket.
   * @description Saves a new article from a given link
   * @param empty
   * @body link, user_id
   * @returns nothing
   * @async
   * @memberof app
   */
router.put("/article", async (req, res) => {
  const { extract } = require("article-parser");
  let url = String(req.body.url);
  let userid = req.body.user_id;

  let doesExist = await Article.exists({ links: url });
  if (!doesExist) {
    let processedTags = [];
    let rawTags = []
    rawTags.push(req.body.tags)
    console.log("raw tags: " + rawTags);
    processedTags = rawTags
      .map(function (value) {
        return value.toLowerCase();
      })
      .sort();
    console.log("lowecase and sorted tags: " + processedTags);
    const uniqueTags = new Set(processedTags);
    processedTags = [...uniqueTags];
    console.log("Lowercase, sorted and unique tags: " + processedTags);

    extract(url)
      .then((article) => {
        let newArticle = new Article(article);
        newArticle.user_id = userid;
        newArticle.tags = processedTags;
        newArticle.save();
        res.send(newArticle)
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.sendStatus(409);
  }
});

/**
   * @type ExpressSocket.
   * @description Gets a specific article based on ID
   * @param empty
   * @body article_id
   * @returns {article}
   * @async
   * @memberof app
   */
router.get("/article/:id", async (req, res) => {
  id = req.params.id;
  let doesExist = await Article.exists({ _id: id });

  if (doesExist) {
    let article = await Article.find({ _id: id });
    res.send(article);
    await Article.updateOne({ _id: id }, { read: true });
  } else {
    res.sendStatus(409);
  }
});

/**
   * @type ExpressSocket.
   * @description Deletes a specific article from the DB
   * @param empty
   * @body article_id
   * @returns nothing
   * @async
   * @memberof app
   */
router.delete("/article", async (req, res) => {
  let url = String(req.body.url);
  let doesExist = await Article.exists({ links: url });

  if (doesExist) {
    await Article.deleteOne({ links: url });
    res.sendStatus(200);
  } else {
    res.sendStatus(409);
  }
});

/**
   * @type ExpressSocket.
   * @description Retrieves all articles with given tag(s), tags are OR not AND
   * @param empty
   * @body tags
   * @returns [{article}, {article}, ...]
   * @async
   * @memberof app
   */
router.get("/tags", async (req, res) => {
  let rawTags = req.body.tags;
  processedTags = rawTags
    .map(function (value) {
      return value.toLowerCase();
    })
    .sort();

  const result = await Article.find({ tags: { $in: processedTags } });
  res.send(result);
});

/**
   * @type ExpressSocket.
   * @description Retrieved all articles with given user_id
   * @param empty
   * @body user_id
   * @returns [{article}, {article}, ...]
   * @async
   * @memberof app
   */
router.get("/user/:id", async (req, res) => {
  let userid = req.params.id
  console.log(userid);

  let allArticles = await Article.find({ user_id: userid });
  res.send(allArticles);
});

module.exports = router;
