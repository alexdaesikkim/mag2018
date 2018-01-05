var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var qs = require('querystring');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('/get_random_song/:count/:min_level/:max_level/:min/:max/', function(req, res, next){
  var count = req.params.count;
  var min = req.params.min;
  var max = req.params.max;
  var min_level = req.params.min_level;
  var max_level = req.params.max_level;

  var options = {
    url: 'http://randomizer-sample.herokuapp.com/random/iidx/24/',
    method: 'GET',
    body: {
      min_difficulty: min,
      max_difficulty: max,
      min_level: min_level,
      max_level: max_level,
      count: count,
      build: "",
      style: "single"
    },
    json: true
  }

  request(options, function(error, response, body){
    if(!error && response.statusCode === 200){
      console.log(body);
      res.status(200);
      res.json(body);
      res.end();
    }
    else if(error){
      res.status(500);
      res.json(error);
      res.end();
    }
    else{
      res.status(400);
      res.json(body);
      res.end();
    }
  })
});

const port = process.env.PORT || 3001;

app.listen(port);
