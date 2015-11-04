var React = require('react');

var List = React.createClass({
	componentDidMount: function() {
		console.log(this.props.users);
	},
	render: function() {
		var self = this;
		var users = this.props.users.map(
		function(userId){
			return (
				<ListRow key={userId} userId={userId} getUserInfo={self.props.getUserInfo} />
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