const port = 3000;
const serverHostname = `${window.location.hostname}:${port}`
const serverFetchBase = `${window.location.protocol}//${serverHostname}`
const {
    extract
  } = require('article-parser');

export async function getArticle(url){
        try {
          const article = await extract(url);
          console.log(article);
        } catch (err) {
          console.trace(err);
        }
}

