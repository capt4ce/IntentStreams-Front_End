var React = require('react');
//var Draggable = require('react-drag-and-drop');

import { Draggable } from 'react-drag-and-drop';
import Popover from 'react-simple-popover';

var Keyword = React.createClass({

    getInitialState() {
        return {
            openPopup: false
        }

    },

    handleClick: function (e) {
        e.stopPropagation()
    },

    handleClosePop: function (e) {
        this.setState({ openPopup: false });
    },

    handleOpenPop: function (e) {
        this.setState({ openPopup: !this.state.openPopup });
    },

    dragStart: function (event) {
        event.stopPropagation()
        var data = {
            type: 'keyword',
            streamOrigin: this.props.streamKey,
            content: this.props.keyword.title
        };
        event.dataTransfer.setData('text', JSON.stringify(data));

    },

    render: function () {
        return (
            <div draggable='true' onDragStart={this.dragStart}>
                <div className='keyword-body' onMouseEnter={this.handleOpenPop.bind(this)} onMouseLeave={this.handleClosePop.bind(this)}>
                    {this.props.keyword.title}
                </div>
                <Popover
                    placement='right'
                    container={this}
                    show={this.state.openPopup}
                    target={this.refs.target}
                    onHide={this.handleClosePop.bind(this)} >
                    <p>Loading...</p>
                </Popover>
            </div>
        );
    }

});

module.exports = Keyword;
