var AppDispatcher = require('../Dispatcher/streamsDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../Constants/streamsConstants');
var StreamAPI = require('../API/streamsAPI.js');
var _ = require('underscore');

var _stream = [];
var _hints = [];

function loadData(data) {
  StreamAPI.getDataValue(data);
}

function getData(post, keyword, query) {
  console.log('post:' + JSON.stringify(post))
  console.log('keyword:' + JSON.stringify(keyword))
  console.log('query:' + JSON.stringify(query))
  _stream.push({
    post: post,
    keyword: keyword,
    query: query
  })
}

function loadHints(hintTitles){
  _hints=hintTitles
}

function removeData(key) {
  console.log('post:' + JSON.stringify(key))
  _stream.splice(key, 1)
}

function refreshResult(streamIdx, post, keyword, query) {
  _stream[streamIdx] = {
    post: post,
    keyword: keyword,
    query: query
  }
}

// Extend Cart Store with EventEmitter to add eventing capabilities
var ShowStore = _.extend({}, EventEmitter.prototype, {

  loadDataInfo: function (query) {
    loadData(query);
    console.log(query)
  },
  getDataInfo: function () {
    return _stream;
  },
  getHintInfo: function(){
    return _hints;
  },
  // Emit Change event
  emitChange: function () {
    this.emit('change');
  },
  // Add change listener
  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  // Remove change listener
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  }
});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
  var action = payload.action;
  var text;
  switch (action.actionType) {
    // Respond to CART_ADD action
    case FluxCartConstants.LOAD_STUFFS:
      getData(action.post, action.keyword, action.query);
      break;

    case FluxCartConstants.DELETE_STUFFS:
      removeData(action.key);
      break;

    case FluxCartConstants.REFRESH_RESULT:
      refreshResult(action.streamIdx, action.post, action.keyword, action.query)
      break

    case FluxCartConstants.LOAD_HINT:
      loadHints(action.hintTitles)  
      break



    default:
      return true;
  }
  // If action was responded to, emit change event
  ShowStore.emitChange();
  return true;
});



module.exports = ShowStore;
