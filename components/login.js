var React = require('react');

var History = require('react-router').History;

var api = require('./services/api');

var Login = React.createClass({
	mixins: [ History ],

	getInitialState() {
		return {
			error: false
		};
	},

	handleSubmit(event) {
		var self = this;

		event.preventDefault();

		var user = this.refs.user.value;
		var pass = this.refs.pass.value;

		api.login(user, pass).then(
		function(){
			var { location } = self.props

			if (location.state && location.state.nextPathname) {
				self.history.replaceState(null, location.state.nextPathname)
			} else {
				self.history.replaceState(null, '/')
			}

		}, function(){
			self.setState({
				error: true
			});
		});
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="row">
					<div className="col-xs-4 col-xs-offset-4">
						<input ref="user" placeholder="user" className="form-control"/>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-4 col-xs-offset-4">
						<input ref="pass" placeholder="password" className="form-control"/>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-4 col-xs-offset-4">
						<button type="submit" className="btn btn-primary">
							Login
						</button>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-4 col-xs-offset-4">
						{
							this.state.error && (
								<p>Bad login information</p>
							)
						}
					</div>
				</div>
			</form>
		)
	}
})

module.exports = Login;