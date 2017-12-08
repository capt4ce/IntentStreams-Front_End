var React = require('react');

import { Label } from 'react-bootstrap';
import { Draggable } from 'react-drag-and-drop';

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
		let _this=this
		if (!this.state.showDetail)
			return (
				<div className='post-body' style={{marginBottom:"10px"}} onClick={this.showDetail}>
					{this.props.post.name}<br/>
					{(this.props.post.tags).map(function(val){
						return (<Draggable
						className="result-tags"
						defaultPosition={{ x: 0, y: 0 }}
						position={null}
						onStart={null}
						onDrag={null}
						onStop={null}
						onClick={null}
						data={_this.props.streamKey+"~"+val}
						type="result_tag">
						<Label bsStyle="primary" style={{marginRight:"1px"}}>{val}</Label>
					</Draggable>)
					})}
				</div>
			);
		else
			return (
				<div className='post-body info' onClick={this.hideDetail}>
					<div><label>Title</label>{this.props.post.name}</div>
					{(this.props.post.tags).map(function(val){
						return (<Draggable
						className="result-tags"
						defaultPosition={{ x: 0, y: 0 }}
						position={null}
						onStart={null}
						onDrag={null}
						onStop={null}
						onClick={null}
						data={[_this.props.streamKey,val]}
						type="result_tag">
						<Label bsStyle="primary" style={{marginRight:"1px"}}>{val}</Label>
					</Draggable>)
					})}
					<div><label>Description</label>{this.props.post.description}</div>
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
