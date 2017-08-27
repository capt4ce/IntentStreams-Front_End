var React = require('react');

var Post = React.createClass({
	// componentDidMount: function () {
	// 	this.setState({
	// 		showDetail: false
	// 	});
	// 	this.state = {
	// 		showDetail: false
	// 	}
	// 	console.log(this.state)

	// },

	getInitialState: function () {
		return {
			showDetail: false
		}
	},

	showDetail: function () {
		console.log("show detail");
		this.setState({
			showDetail: true
		});
		// this.state = {
		// 	showDetail: true
		// }
	},

	hideDetail: function () {
		console.log("hide detail");
		this.setState({
			showDetail: false
		});
		// this.state = {
		// 	showDetail: false
		// }
	},

	render: function () {
		if (!this.state.showDetail)
			return (
				<div className='post-body' onClick={this.showDetail}>
					{this.props.post.title}
				</div>
			);
		else
			return (
				<div className='post-body' onClick={this.hideDetail}>
					{this.props.post.title}
					{this.props.post.description}
					{this.props.post.latitude}
					{this.props.post.longitude}
				</div>
			);
		// return (
		// 	<div className='post-body' onClick={this.showDetail}>
		// 		{this.props.post.title}
		// 	</div>
		// );
	}

});

module.exports = Post;
