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

import { Button, Modal } from 'react-bootstrap';
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

  modalShow: function (e) {
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

  modalClose: function (e) {
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
    // alert(JSON.stringify(e))
    this.modalShow()
    // alert(JSON.stringify(data.keyword));
    if (data.keyword) {
      let query = data.keyword.split('~')
      alert(query)
      StreamAPI.getDataValue(query[1]);
    }
    else if (data.result_tag) {
      let query = data.result_tag.split('~')
      alert(query)
      StreamAPI.getDataValue(query[1]);
    }
  },

  inStreamDrop: function (data, a, b, c) {
    alert(JSON.stringify(data))
    alert(JSON.stringify(a))
    alert(JSON.stringify(b))
    alert(JSON.stringify(c))
    return false
    // this.modalShow()
    // // alert(JSON.stringify(data.keyword));
    // if (data.keyword) {
    //   let query = data.keyword.split('~')
    //   alert(query)
    //   StreamAPI.getDataValue(query[1]);
    // }
    // else if (data.result_tag) {
    //   let query = data.result_tag.split('~')
    //   alert(query)
    //   StreamAPI.getDataValue(query[1]);
    // }
  },

  preventDefault: function (event) {
    event.preventDefault();
  },

  drop: function (event) {
    console.log('drop in background')
    event.preventDefault();
    var data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text'));
    } catch (e) {
      // If the text data isn't parsable we'll just ignore it.
      return;
    }

    console.log(event)
    // Do something with the data
    switch (data.type) {
      case 'keyword':
        console.log('background, keyword' + JSON.stringify(data));
        break
      case 'result-tag':
        console.log('background, result-tag' + JSON.stringify(data));
        break
      case 'default': alert('nothing caught')
    }

  },

  dropInStream: function (event, streamIdx) {
    console.log('drop in stream')
    event.preventDefault()
    event.stopPropagation()
    var data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text'));
    } catch (e) {
      // If the text data isn't parsable we'll just ignore it.
      return;
    }

    console.log(event)
    if (streamIdx == data.streamOrigin)
      alert('same stream')
    else
      switch (data.type) {
        case 'keyword':
          console.log('stream, keyword' + JSON.stringify(data));
          break
        case 'result-tag':
          console.log('stream, result-tag' + JSON.stringify(data));
          break
        case 'default': alert('nothing caught')
      }

  },

  moveCard: function (dragIndex, hoverIndex) {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  },

  bookmarkDragOver: function (e) {

  },

  bookmarkDrop: function (e) {
    console.log('drop in bookmark drop')
    e.preventDefault()
    e.stopPropagation()
    var data;
    try {
      data = JSON.parse(e.dataTransfer.getData('text'));
    } catch (e) {
      // If the text data isn't parsable we'll just ignore it.
      return;
    }

    switch (data.type) {
      case 'keyword':
        console.log('bookmark, post-body' + JSON.stringify(data));
        break
      case 'default': alert('nothing caught')
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
    if (this.state.showSearch) {
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

        let streamDrop = function (e) {
          e.stopPropagation()
          _this.dropInStream(e, i)
        }

        return (
          <div class="together">
            <div className="stream_droppable" style={{ height: '100%' }} onDragOver={_this.preventDefault} onDrop={streamDrop}>
              <Button bsStyle="danger" className="close_frame btn-circle" onClick={closeStream}></Button>

              <div className="multi_post">
                <Multi_Post posts={datas.post} key={i} streamKey={i} />
              </div>
              <div className="multi_keyword">
                <Multi_Keyword query={datas.query} keywords={datas.keyword} key={i} streamKey={i} />
              </div>
            </div>
          </div>
        )
      }
      )
    }
    else {
      container = null;
    }

    return (
      <div className="flux-streams-app" onClick={this.showSearch} onDragOver={this.preventDefault} onDrop={this.drop}>
        {search}
        {container}

        <div className="bookmark-drop" onDragOver={this.preventDefault} onDrop={this.bookmarkDrop}>Drop Here To Bookmark</div>

        <Modal show={this.state.showModal} bsSize="small">
          <Modal.Body>
            Loading...
            </Modal.Body>
        </Modal>
      </div >
    );
  },

  // Method to setState based upon Store changes
  _onChange: function () {
    this.setState(getCartState());

  }

});

module.exports = StreamApp;
