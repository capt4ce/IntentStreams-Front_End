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



  render: function () {
    return (

      <div style={{ position: "fixed", left: this.props.posX - 20, top: this.props.posY - 30 }} className="row" >
        <div className="col-xs-6 search_bar">

          <form onSubmit={this.props.submitSearch} className="input col-xs-4">

            <FormControl
              type="text"
              placeholder="Search..."
              value={this.props.query}
              onChange={this.props.typeQuery}
              onClick={this.enter}

            />

            <Button bsStyle="danger" onClick={this.props.hidePart}>Close</Button>

          </form>
        </div>

      </div>

      // </Draggable>

    );
  }
});

module.exports = SearchBar;