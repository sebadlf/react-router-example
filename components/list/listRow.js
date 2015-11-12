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
		var name = this.state.user.name
						? this.state.user.name + " (" + this.state.user.login + ")"
						: this.state.user.login;

		var imageSrc = this.state.user.avatar_url;

		return (
			<div className="row">
				<div className="col-xs-10">
					<h3>
						<span>Name:</span> <span>{name}</span>
					</h3>
					{
						this.state.user.location
							? <div><span>Location:</span><span>{this.state.user.location}</span></div>
							: null
					}
					<div><span>Public Repos:</span><span>{this.state.user.public_repos}</span></div>

				</div>
				<div className="col-xs-2">
					<img src={imageSrc} alt={this.state.user.login} className="img-responsive img-rounded" />
				</div>
			</div>
		);
	}
});

module.exports = ListRow;