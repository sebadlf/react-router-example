var React = require('react');
var ListRow = require('./listRow');

var api = require('./../services/api');

var List = React.createClass({
	getInitialState: function() {
		return {
			users: []
		};
	},
	componentDidMount: function() {
		var self = this;
		api.getUsers().then(
		function(users) {
			self.setState({
				users: users
			});
		});
	},
	render: function() {
		var users = this.state.users.map(
		function(userId){
			return (
				<ListRow key={userId} userId={userId} getUserInfo={api.getUserInfo} />
			);
		});

		return (
			<div>
				{users}
			</div>
		);
	}
});

module.exports = List;