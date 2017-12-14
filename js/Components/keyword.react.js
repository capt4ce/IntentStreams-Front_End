var React = require('react');
//var Draggable = require('react-drag-and-drop');

import { Draggable } from 'react-drag-and-drop';
import Popover from 'react-simple-popover';
import ReactHoverObserver from 'react-hover-observer';
var StreamAPI = require('../API/streamsAPI.js');

var Keyword = React.createClass({

    getInitialState() {
        return {
            openPopup: false
        }

    },

    handleClick: function (e) {
        e.stopPropagation()
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
        let _this=this
        let hoverFunct = ()=>{
            console.log('hovering'); StreamAPI.loadHints()
        }
        const Detector = ({ isHovering = false }) => (
            <div style={{display:"none"}}>
              {isHovering ? hoverFunct() : console.log('not hovering')}
             </div>
          );
        return (
            <ReactHoverObserver
                className="example__observer"
                hoverDelayInMs={500}
                hoverOffDelayInMs={200}
            >
                <div draggable='true' onDragStart={this.dragStart}>
                    <div className='keyword-body' onMouseEnter={this.props.handleOpenPop} onMouseEnter={this.props.Leave}>
                        {this.props.keyword.title}
                    </div>
                </div>
                <Detector />
            </ReactHoverObserver>
        );
    }

});

module.exports = Keyword;
// onMouseEnter={this.handleOpenPop.bind(this)} onMouseLeave={this.handleClosePop.bind(this)}