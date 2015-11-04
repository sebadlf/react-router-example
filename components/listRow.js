var React = require('react');

var ListRow = React.createClass({
	getInitialState: function() {
		return {
			user: {}
		};
	},
	componentDidMount: function() {
		var self = this;
		this.props.getUserInfo(this.props.userId).then(
		function(user){
			self.setState({
				user: user
			});
		});
	},
	render: function() {
		var name = this.state.user.name ? this.state.user.name : this.state.user.login;
		var imageSrc = this.state.user.avatar_url;

		return (
			<div>
				<span>Name:</span> <span>{name}</span>
				<img src={imageSrc} alt={this.state.user.login}/>
			</div>
		);
	}
});

module.exports = ListRow;