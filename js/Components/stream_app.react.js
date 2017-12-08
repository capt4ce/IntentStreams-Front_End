var React = require('react');
var ShowStore = require('../Stores/streamsStores');
// var Container_Post = require('./container_posts.react.js');
// var Container_Keyword = require('./container_keywords.react.js');
var SearchBar = require('./search.react.js');
var Container = require('./container.react.js');
var Multi_Post = require('./multi_posts.react.js');
var Multi_Keyword = require('./multi_keywords.react.js');
var StreamAPI = require('../API/streamsAPI.js');
var FluxCartActions = require('../Actions/streamsAction');

//var Droppable  = require('react-drag-and-drop');

import { Button,Modal } from 'react-bootstrap';
import { Droppable } from 'react-drag-and-drop';



// Method to retrieve state from Stores
function getCartState() {
  return {
    data: ShowStore.getDataInfo(),
    showModal: false,
    showSearch: false,
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

  handleClick: function (e) {
    e.stopPropagation()
  },


  showSearch: function (e, target) {

    e.preventDefault()

    this.setState({
      data: this.state.data,
      showModal: this.state.showModal,
      showSearch: true,
      search_query: this.state.search_query,
      partX: e.pageX,
      partY: e.pageY
    });
  },

  hidePart: function (e) {

    this.setState({
      data: this.state.data,
      showModal: this.state.showModal,
      showSearch: false,
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
      showModal: this.state.showModal,
      showSearch: true,
      search_query: e.target.value,
      partX: this.state.partX,
      partY: this.state.partY
    });
  },

  submitSearch: function (e) {
    e.preventDefault()
    this.modalShow(e)
    console.log('search query=' + (this.state.search_query))
    // ShowStore.loadDataInfo(this.state.search_query);
    StreamAPI.getDataValue(this.state.search_query);
    return true
  },

  hideFrame: function (key) {
    //console.log(e)
    FluxCartActions.deleteStuffs(key);

  },

  modalShow: function(e){
    this.setState({
      data: this.state.data,
      showModal: true,
      showSearch: this.state.showSearch,
      search_query: this.state.search_query,
      partX: this.state.partX,
      partY: this.state.partY
    });
    if (e)
      e.stopPropagation()
  },

  modalClose: function(e){
    this.setState({
      data: this.state.data,
      showModal: false,
      showSearch: this.state.showSearch,
      search_query: this.state.search_query,
      partX: this.state.partX,
      partY: this.state.partY
    });
    e.stopPropagation()
  },

  newStream: function (data, e) {
    alert(JSON.stringify(e))
    this.modalShow()
    // alert(JSON.stringify(data.keyword));
    if (data.keyword){
      let query = data.keyword.split('~')
      alert(query)
      StreamAPI.getDataValue(query[1]);
    }
    else if (data.result_tag){
      let query = data.result_tag.split('~')
      alert(query)
      StreamAPI.getDataValue(query[1]);
    }
  },

  inStreamDrop: function (data) {
    this.modalShow()
    // alert(JSON.stringify(data.keyword));
    if (data.keyword){
      let query = data.keyword.split('~')
      alert(query)
      StreamAPI.getDataValue(query[1]);
    }
    else if (data.result_tag){
      let query = data.result_tag.split('~')
      alert(query)
      StreamAPI.getDataValue(query[1]);
    }
  },

  // componentDidMount: function(){
  //   if (this.state.showSearch)
  //     this.searchInput.focus();
  // },


  // Render our child components, passing state via props
  render: function () {
    // console.log(this.state)

    var search, stream;
    if (this.state.showSearch){
      search = <SearchBar query={this.state.search_query} typeQuery={this.typeQuery} submitSearch={this.submitSearch} hidePart={this.hidePart} posX={this.state.partX} posY={this.state.partY} ref={(input) => { this.searchInput = input; }} />

    }
    else
      search = null;


    // console.log(Multi_Keyword)
    if ("data" in this.state && this.state.data.length != 0) {
      // var post = (this.state.data).map(function (datas, i) {
      //   return (
      //     <Multi_Post posts={datas.post} key={i} />
      //   )
      // })

      // var keyword = (this.state.data).map(function (datas, i) {
      //   return (
      //     <Multi_Keyword keywords={datas.keyword} key={i} />
      //   )
      // }
      // )

      let _this = this;
      var container = (this.state.data).map(function (datas, i) {
        let closeStream = function (e) {
          e.stopPropagation();
          _this.hideFrame(i);

        }
        return (
          <div class="together">
            <Droppable style={{height:"100%"}} types={['keyword','result_tag']} onDrop={_this.inStreamDrop.bind(this)}>
            <Button bsStyle="danger" className="close_frame btn-circle" onClick={closeStream}></Button>

            <div className="multi_post">
              <Multi_Post posts={datas.post} key={i} streamKey={i}/>
            </div>
            <div className="multi_keyword">
              <Multi_Keyword query={datas.query} keywords={datas.keyword} key={i} streamKey={i}/>
            </div>
            </Droppable>
          </div>
        )
      }
      )
    }
    else {
      container = null;
    }

    return (
      <Droppable className="flux-streams-app" onClick={this.showSearch} style={{ padding: '25px' }} types={['keyword','result_tag']} onDrop={this.newStream}>
        {search}
        {container}

        <Modal show={this.state.showModal} bsSize="small">
          <Modal.Body>
            Loading...
            </Modal.Body>
          </Modal>
      </Droppable >
    );
  },

  // Method to setState based upon Store changes
  _onChange: function () {
    this.setState(getCartState());

  }

});

module.exports = StreamApp;
