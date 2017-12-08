var React = require('react');
//var Draggable = require('react-drag-and-drop');

import { Draggable } from 'react-drag-and-drop';
import Popover from 'react-simple-popover';

var Keyword = React.createClass({

    getInitialState() {
        return {
            opePopup: false
        }

    },

    handleStart: function (event, ui) {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    },

    handleDrag: function (event, ui) {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    },

    handleStop: function (event, ui) {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    },

    handleClick: function (e) {
        e.stopPropagation()
    },

    handleClose: function (e) {
        this.setState({ opePopup: false });
    },

    handleClickPop: function (e) {
        this.setState({ opePopup: !this.state.opePopup });
    },

    render: function () {

        return (
            <Draggable
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
                onClick={this.handleClick}
                data={this.props.streamKey+"~"+this.props.keyword.title}
                type="keyword">
                <div className='keyword-body' onMouseEnter={this.handleClickPop.bind(this)} onMouseLeave={this.handleClose.bind(this)}>
                    {this.props.keyword.title}
                </div>
                <Popover
                    placement='right'
                    container={this}
                    show={this.state.opePopup}
                    target={this.refs.target}
                    onHide={this.handleClose.bind(this)} >
                    <p>This is popover</p>
                </Popover>
            </Draggable>
        );
    }

});

module.exports = Keyword;
