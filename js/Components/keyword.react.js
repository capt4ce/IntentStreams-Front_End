var React = require('react');
var Draggable = require('react-draggable');

var Keyword = React.createClass({

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

    render: function () {
    
        return (
            <Draggable
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
                onClick={this.handleClick}>
                <div className='keyword-body'>
                    {this.props.keyword.title}
                </div>
            </Draggable>
        );
    }

});

module.exports = Keyword;
