'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var NotFoundRoute = require('react-router').NotFoundRoute;
var Redirect = require('react-router').NotFoundRoute;
var Link = require('react-router').Link;
var History = require('react-router').History;

var createHistory = require('history').createHistory;
var useBasename = require('history').useBasename;

var api = require('./services/api');

const history = useBasename(createHistory)({
  basename: '/'
});

var App = React.createClass({
	render: function() {
		return (
			<div className="container">

				<nav className="navbar navbar-inverse navbar-fixed-top">
					<div className="container">
						<div className="navbar-header">
							<Link className="navbar-brand" to="/">Github Group</Link>
						</div>
						<div id="navbar" className="navbar-collapse collapse">
							<ul className="nav navbar-nav">
								<li><Link to="edit">Edit</Link></li>
								<li><Link to="about">About</Link></li>
						    	{
									!api.isLogedIn() ? <li><Link to="login">Login</Link></li> : null
						    	}
							</ul>
						</div>
					</div>
				</nav>

				{this.props.children || "Welcome to your Inbox"}
			</div>

		);
	}
});

function requireAuth(nextState, replaceState) {
  	if (!api.isLogedIn()){
		replaceState({ nextPathname: nextState.location.pathname }, '/login')
  	}
}

//<Redirect from="edit-all" to="edit" />

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={App}>
    	<IndexRoute component={require('./list/list')} />
    	<Route path="edit" component={require('./listEdit/listEdit')}  onEnter={requireAuth}  />
    	<Route path="login" component={require('./login')}/>
		<Route path="about" component={require('./about/about')} />
		<Route path="*" component={require('./notFoundPage')}/>
    </Route>
  </Router>
), document.getElementById('app'))

//ReactDOM.render(<App/>, document.getElementById('app'));