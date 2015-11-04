var React = require('react');
var ReactDOM = require('react-dom');
var qwest = require('qwest');
var List = require('./list');

var App = React.createClass({
	getInitialState: function() {
		return {
			users: []
		};
	},
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
	componentDidMount: function() {
		var self = this;
		this.getUsers().then(
		function(users) {
			self.setState({
				users: users
			});
		});
	},
	render: function() {
		return (
			<List users={this.state.users} getUserInfo={this.getUserInfo} />
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('app'));