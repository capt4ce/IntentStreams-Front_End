var React = require('react');
var ShowStore = require('../Stores/streamsStores');
var Container_Post = require('./container_posts.react.js');
var Container_Keyword = require('./container_keywords.react.js');
var SearchBar = require('./search.react.js');



// Method to retrieve state from Stores
function getCartState() {
  return {
    data: ShowStore.getDataInfo(),
    showPart: false,
    search_query: ''
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



  showPart: function (e, target) {

    e.preventDefault()

    this.setState({
      data: this.state.data,
      showPart: true,
      search_query: this.state.search_query,
      partX: e.pageX,
      partY: e.pageY
    });
  },

  hidePart: function (e) {

    this.setState({
      data: this.state.data,
      showPart: false,
      search_query: '',
      partX: 0,
      partY: 0
    });
    console.log(this.state)
    e.stopPropagation()
  },

  typeQuery: function (e) {
    this.setState({
      data: this.state.data,
      showPart: true,
      search_query: e.value,
      partX: this.state.partX,
      partY: this.state.partY
    });
  },

  submitSearch: function (e) {
    ShowStore.loadDataInfo();
    console.log("scb")
    return false
  },


  // Render our child components, passing state via props
  render: function () {
    // console.log(this.state)
    var search;
    if (this.state.showPart)
      search = <SearchBar query={this.state.search_query} typeQuery={this.typeQuery} submitSearch={this.submitSearch} hidePart={this.hidePart} posX={this.state.partX} posY={this.state.partY} />
    else
      search = null;
    return (
      <div className="flux-streams-app" onClick={this.showPart} style={{ 'background-color': 'red', padding: '25px' }}>
        {search}


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
