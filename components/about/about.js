'use strict';

var React = require('react');

var About = React.createClass({
	render: function () {
		return (
			<div>
				<h1>About</h1>
				<div>
					This application uses the following thechnologies:
					<ul>
						<li>React</li>
						<li>React Router</li>
						<li>Node</li>
						<li>Gulp</li>
						<li>Browserify</li>
						<li>Babel</li>
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = About;