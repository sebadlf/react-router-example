'use strict';

var React = require('react');

var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
	render: function(){
		return (
			<div>
				<h1>Not Found</h1>
				<p>Whoops!!!</p>
				<p><Link to="/">Back to Home</Link></p>
			</div>
		);
	}
});

module.exports = NotFoundPage;