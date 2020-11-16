const express = require("express");
const router = express.Router();
var request = require("request");


router.get("/", async function (req, res,next){
    request.get( 'https://www.nu.nl/economie/6090164/ing-nederlander-pint-voor-bijna-10-procent-minder-sinds-vierde-kwartaal.html', function(error, response, body){
        if( error )
          return next(error);
    
        // const html = body;
        // content = JSON.stringify(html);
        // parse = JSON.parse(content);
        
        // console.log(parse)
        // console.log(body)
        res.send(body);

      });
})

module.exports = router;