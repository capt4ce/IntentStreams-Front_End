var React = require('react');
var ShowStore = require('../Stores/streamsStores');

var SearchBar = React.createClass({

  enter: function (e) {
    e.stopPropagation()
  },

  render: function () {
    return (
      <div style={{ position: "relative", left: this.props.posX - 20, top: this.props.posY - 30 }} >
        <form onSubmit={this.props.submitSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.query}
            onChange={this.props.typeQuery}
            onClick={this.enter}

          />
        </form>
        <button onClick={this.props.hidePart}>close</button>
      </div>

    );
  }
});

module.exports = SearchBar;