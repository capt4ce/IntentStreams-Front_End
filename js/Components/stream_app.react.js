var React = require('react');
var ShowStore = require('../Stores/streamsStores');
var Container_Post = require('./container_posts.react.js');
var Container_Keyword = require('./container_keywords.react.js');



// Method to retrieve state from Stores
function getCartState() {
  return {
    data: ShowStore.getDataInfo(),
  };
}

// Define main Controller View
var StreamApp = React.createClass({

  // Get initial state from stores
  getInitialState: function () {
    return getCartState();
  },

  // Add change listeners to stores
  componentDidMount: function () {
    ShowStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function () {
    ShowStore.removeChangeListener(this._onChange);
  },

  // Render our child components, passing state via props
  render: function () {
    console.log(this.state)
    return (
      <div className="flux-streams-app">
        <Container_Post cposts={this.state.data} />

        <Container_Keyword ckeyword={this.state.data} />

      </div>

    );
  },

  // Method to setState based upon Store changes
  _onChange: function () {
    this.setState(getCartState());

  }

});

module.exports = StreamApp;
