var React = require('react');
var ShowStore = require('../Stores/streamsStores');
var Draggable = require('react-draggable');

import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

var SearchBar = React.createClass({

  enter: function (e) {
    e.stopPropagation()
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


  render: function () {
    return (

      // <Draggable
      //   defaultPosition={{ x: 0, y: 0 }}
      //   position={null}
      //   onStart={this.handleStart}
      //   onDrag={this.handleDrag}
      //   onStop={this.handleStop}>


      <div style={{ position: "relative", left: this.props.posX - 20, top: this.props.posY - 30 }} className="row" >
        <div className="col-xs-6">
          <Button bsStyle="danger" onClick={this.props.hidePart}>Close</Button>
          <form onSubmit={this.props.submitSearch} className="input col-xs-4">

            <FormControl
              type="text"
              placeholder="Search..."
              value={this.props.query}
              onChange={this.props.typeQuery}
              onClick={this.enter}

            />

          </form>
        </div>

      </div>

      // </Draggable>

    );
  }
});

module.exports = SearchBar;