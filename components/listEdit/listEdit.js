var React = require('react');

var api = require('./../services/api');
var TextInput = require('./../common/textInput');

var ListEdit = React.createClass({
	getInitialState: function() {
		return {
			users: [],
			newUserId: null
		};
	},
	componentDidMount: function() {
		this.getUsers();
	},
	handleOnChange: function(event){
		this.setState({
			dirty: true
		});

		var field = event.target.name;
		var value = event.target.value;

		this.setState({ newUserId: value });
	},
	getUsers: function(){
		var self = this;
		api.getUsers().then(
		function(users) {
			self.setState({
				users: users
			})
		});
	},
	handleSaveUser(event) {
		event.preventDefault();

		var self = this;
		console.log('Saving ' + this.state.newUserId)
		api.saveUser(this.state.newUserId).then(
		function(){
			self.getUsers();
			self.setState({
				newUserId: null
			});
		}, function(error) {
			self.setState({
				newUserError: error.message
			});
		});
	},
	handleDeleteUser: function(userId){
		var self = this;
		console.log('Deleting ' + userId)
		api.deleteUser(userId).then(
		function(){
			self.getUsers();
			self.setState({
				newUserError: null
			});
		}, function(error) {
			self.setState({
				newUserError: error.message
			});
		});
	},
	render: function() {
		var self = this;

		return (
			<div>
				<form onSubmit={this.handleSaveUser}>
					<div className="row">
						<div className="col-xs-10">
							<TextInput name="newUser"
										label="New User"
										value={this.state.newUserId}
										onChange={this.handleOnChange}
										error={this.state.newUserError}
										/>
						</div>
						<div className="col-xs-2">
							<label>&nbsp;</label>
							<div className="field">
								<button className="btn btn-primary" onClick={this.handleSaveUser} >
									Save
								</button>
							</div>
						</div>
					</div>
				</form>
				{
					this.state.users.map(
						function(userId) {
							var boundClick = self.handleDeleteUser.bind(null, userId);
							return (
								<div key={userId} className="row">
									<div className="col-xs-10">
										{userId}
									</div>
									<div className="col-xs-2">
										<button className="btn btn-danger" onClick={boundClick} >
											Delete
										</button>
									</div>

								</div>
							)
						}
					)
				}
			</div>
		);
	}
});

module.exports = ListEdit;