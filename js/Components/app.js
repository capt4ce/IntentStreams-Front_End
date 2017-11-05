var React = require('react');
var ShowStore = require('../Stores/streamsStores');
var Container_Post = require('./container_posts');
var Container_Keyword = require('./container_keywords');
var Droppable  = require('react-drag-and-drop');
//import NpsForecastMap from './container.react.js';


// Method to retrieve state from Stores
function getCartState() {
  return {
    data: ShowStore.getData(),
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
    return (
      <div className="flux-streams-app">
        <Container_Post post={this.state.data.post} />

        <Container_Keyword keyword={this.state.data.keyword} />
        
        // {(this.state.product).map(function(value,index){
        //   return (
        //     <FluxProduct product={value} />
        //     )
        // })}
        
      </div>
      
    );
  },

  // Method to setState based upon Store changes
  _onChange: function () {
    this.setState(getCartState());
  }

});

module.exports = StreamApp;
