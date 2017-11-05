var React = require('react');
var ShowStore = require('../Stores/streamsStores');
// var Container_Post = require('./container_posts.react.js');
// var Container_Keyword = require('./container_keywords.react.js');
var SearchBar = require('./search.react.js');
var Container = require('./container.react.js');
var Multi_Post = require('./multi_posts.react.js');
var Multi_Keyword = require('./multi_keywords.react.js');

var StreamAPI = require('../API/streamsAPI.js');

//var Droppable  = require('react-drag-and-drop');

import { Droppable } from 'react-drag-and-drop' ;



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

  handleClick: function (e) {
    e.stopPropagation()
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
      search_query: e.target.value,
      partX: this.state.partX,
      partY: this.state.partY
    });
  },

  submitSearch: function (e) {
    e.preventDefault()
    console.log('search query=' + (this.state.search_query))
    // ShowStore.loadDataInfo(this.state.search_query);
    StreamAPI.getDataValue(this.state.search_query);
    return true
  },

  alert : function (data){
    
   // alert(JSON.stringify(data.keyword));
    StreamAPI.getDataValue(data.keyword);

  },


  // Render our child components, passing state via props
  render: function () {
    // console.log(this.state)

    var search, stream;
    if (this.state.showPart)
      search = <SearchBar query={this.state.search_query} typeQuery={this.typeQuery} submitSearch={this.submitSearch} hidePart={this.hidePart} posX={this.state.partX} posY={this.state.partY} />
    else
      search = null;

    // if ("data" in this.state && this.state.data.length != 0)

    // var stream = (

    //       <div class="together col-xs-3">
    //         <Container_Post cposts={this.state.data}/>

    //         <Container_Keyword ckeyword={this.state.data}/>
    //       </div>

    //   )

    // else
    //   var stream = null;

    // console.log(Multi_Keyword)
    if ("data" in this.state && this.state.data.length != 0) {

      var post = (this.state.data).map(function (datas, i) {
        return (
          <Multi_Post posts={datas.post} key={i} />
        )
      })

      var keyword = (this.state.data).map(function (datas, i) {
        return (
          <Multi_Keyword keywords={datas.keyword} key={i} />
        )
      }
      )

      //   var container = []
      //   var keywords = []

      // for (var stream in this.state.data){
      //   var streams = (
      //     <div class="together col-xs-3">
      //     <Multi_Post posts={stream.post} key={1}/>
      //     {/* <Multi_Keyword keywords={stream.keyword} /> */}
      //     </div>)
      //     container.push(streams)
      // }
      // console.log(datas.post)
      var container = (this.state.data).map(function (datas, i) {
        return (


          <div class="together col-xs-3">
            {/* {post[i]} */}
            <div className="multi_post">
              <Multi_Post posts={datas.post} key={i} />
            </div>
            <div className="multi_keyword">
              <Multi_Keyword keywords={datas.keyword} key={i} />
            </div>
          </div>


        )
      }
      )
      // var container=(
      //   <div class="together col-xs-3">
      //   {post}
      //   {keyword}
      //   </div>
      // )
      // var stream=(<Container_Keyword ckeyword={this.state.data}/>)
    }



    else {
      container = null;
    }

    //     var stream = (this.state.data).map(function (datas, i) {
    //       console.log(post)
    //       return (
    //         <h1>{datas}</h1>
    //       );

    //     });

    //     if ("data" in this.state && this.state.data.length != 0)
    //       stream = <Container data={this.state.data}/>
    //       else
    //         stream=null

    return (
      <Droppable className="flux-streams-app" onClick={this.showPart} style={{ padding: '25px' }} types={['keyword']} onDrop={this.alert.bind(this)}>
        {search}


        {container}
      </Droppable >
    );
  },

  // Method to setState based upon Store changes
  _onChange: function () {
    this.setState(getCartState());

  }

});

module.exports = StreamApp;
