var qwest = require('qwest');

var loggedIn = false;

module.exports = {
	getUsers: function(){
		var promise = new Promise(function(resolve, reject){
			qwest.get('/user').then(
			function(xhr, response) {
				resolve(response);
			},
			function(xhr, error) {
				reject(error);
			});
		});

		return promise;
	},
	getUserInfo: function(userId){
		var promise = new Promise(function(resolve, reject){
			qwest.get('/user/' + userId).then(
			function(xhr, response) {
				resolve(response);
			},
			function(xhr, error) {
				reject(error);
			});
		});

		return promise;
	},
	saveUser: function(userId){
		var promise = new Promise(function(resolve, reject){
			qwest.post('/user/' + userId, {}).then(
			function(xhr, response) {
				resolve(response);
			},
			function(xhr, error) {
				reject(error);
			});
		});

		return promise;
	},
	deleteUser: function(userId){
		var promise = new Promise(function(resolve, reject){
			qwest.delete('/user/' + userId).then(
			function(xhr, response) {
				resolve(response);
			},
			function(xhr, error) {
				reject(error);
			});
		});

		return promise;
	},
	login: function(user, password){
		var promise = new Promise(function(resolve, reject){
			if (user === 'admin' && password === 'admin'){
				resolve({});
				loggedIn = true;
			} else {
				reject({
					message: 'Invalid user or password'
				});
			}
		});

		return promise;
	},
	isLogedIn: function(){
		return loggedIn;
	}
};