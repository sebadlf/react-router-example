var express = require("express");
var app     = express();
var path    = require("path");
var request = require('request');

var users = ['sebadlf', 'peterhunt'];

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/user',function(req,res){
  res.json(users);
});

app.get('/user/:id', function(req, res){
	var options = {
	  url: 'https://api.github.com/users/' + req.params.id,
	  headers: {
	    'User-Agent': 'sebadlf'
	  }
	};

 	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(JSON.parse(body));
		} else  {
			res.json(JSON.parse(error));
		}
	});
});

app.use(express.static(__dirname + '/../build'));
app.use(express.static(__dirname + '/../bower_components'));

app.listen(3000);