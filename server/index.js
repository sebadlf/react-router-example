var express = require("express");
var app     = express();
var path    = require("path");
var request = require('request');
var Promise = require('promise');

var users = ['sebadlf', 'van1985', 'nicolasmartello'];

var usersCache = {};

app.use(express.static(__dirname + '/../build'));
app.use(express.static(__dirname + '/../bower_components'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/user',function(req,res){
  res.json(users);
});

function getUserInfo (userId){
	var promise = new Promise(function(resolve, reject){

		var options = {
		  url: 'https://api.github.com/users/' + userId,
		  headers: {
		    'User-Agent': 'sebadlf'
		  }
		};

	 	request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(JSON.parse(body));
			} else  {
				reject(JSON.parse(body));
			}
		});
	});

	return promise;
}

app.post('/user/:id', function(req, res){

	var userId = req.params.id;

	if(users.indexOf(userId) > -1){
		var error = {
			message: 'Already Added'
		};

		res.status(400).json(error);
	} else {
		getUserInfo(userId).then(
		function(user){
			users.push(userId);
			res.json(user);
		},function(error){
			res.status(404).json(error);
		});
	}
});


app.delete('/user/:id', function(req, res){
	var userId = req.params.id;

	var index = users.indexOf(userId);
	users.splice(index, 1);

	res.send('DELETE ' + req.params.id);
});

app.get('/user/:id', function(req, res){

	var userId = req.params.id;

	if (usersCache[userId]){
		res.json(usersCache[userId]);
	} else {
		getUserInfo(userId).then(
		function(user){
			res.json(user);
		},function(error){
			res.status(404).json(error);
		});
	}
});

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '', 'index.html'))
})

app.listen(4000);