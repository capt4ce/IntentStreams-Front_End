var React = require('react');

import { Label } from 'react-bootstrap';
import { Draggable } from 'react-drag-and-drop';

var Post = React.createClass({
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
	},

	hideDetail: function () {
		console.log("hide detail");
		this.setState({
			showDetail: false
		});
	},

	postDrag: function (e) {
		e.stopPropagation()
		var data = {
			type: 'post-body',
			streamOrigin: this.props.streamKey,
			content: {
				name: this.props.post.name,
				link: this.props.post.link
			}
		};
		this.props.showBookmarkDrop(e)
		e.dataTransfer.setData('text', JSON.stringify(data));
	},

	render: function () {
		let _this = this
		if (!this.state.showDetail)
			return (
				<div draggable='true' onDragStart={this.postDrag} onDragEnd={e => { e.stopPropagation; this.props.hideBookmarkDrop(e) }} className='post-body' style={{ marginBottom: "10px" }} onClick={this.showDetail}>
					{this.props.post.name}<br />
					{(this.props.post.tags).map(function (val) {
						let dragStart = function (e) {
							e.stopPropagation()
							var data = {
								type: 'result-tag',
								streamOrigin: _this.props.streamKey,
								content: val
							};
							e.dataTransfer.setData('text', JSON.stringify(data));

						}
						return (
							<div draggable='true' onDragStart={dragStart} className="result-tags">
								<Label bsStyle="primary" style={{ marginRight: "1px" }}>{val}</Label>
							</div>)
					})}
				</div>
			);
		else
			return (
				<div draggable='true' onDragStart={this.postDrag} className='post-body info' onClick={this.hideDetail}>
					<div><label>Title</label>{this.props.post.name}</div>
					{(this.props.post.tags).map(function (val) {
						let dragStart = function (e) {
							e.stopPropagation()
							var data = {
								type: 'result-tag',
								streamOrigin: _this.props.streamKey,
								content: val
							};
							e.dataTransfer.setData('text', JSON.stringify(data));

						}
						return (
							<div draggable='true' onDragStart={dragStart} className="result-tags">
								<Label bsStyle="primary" style={{ marginRight: "1px" }}>{val}</Label>
							</div>)
					})}
					<div><a href={this.props.post.link}>{this.props.post.link}</a></div>
					<div><label>Description</label>{this.props.post.description}</div>
				</div>
			);
	}

});

module.exports = Post;
