var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  //Lets configure and request
  request({
    url: 'https://global.api.pvp.net/api/lol/static-data/oce/v1.2/champion', //URL to hit
    qs: {api_key: process.env.RIOT_API_KEY, champData: "image"}, //Query string data
    method: 'GET' //Specify the method
    //headers: { //We can define headers too
    //  'Content-Type': 'MyContentType',
    //  'Custom-Header': 'Custom Value'
    //}
  }, function(error, response, body){
    if(error) {
      console.log(error);
    } else {
      console.log(response.statusCode, body);
      var parse = JSON.parse(body);
      res.render('index', {result: parse});
    }
  });
});


router.get('/images', function(req, res) {
  var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

  download('http://ddragon.leagueoflegends.com/cdn/6.3.1/img/champion/Thresh.png', 'Thresh.png', function(){
    console.log('done');
  });
});
module.exports = router;
