var AppDispatcher = require('../Dispatcher/streamsDispatcher');
var FluxCartConstants = require('../Constants/streamsConstants');

// Define action methods
var FluxCartActions = {

  loadStuffs: function (post, keyword, query) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.LOAD_STUFFS,
      post: post,
      keyword: keyword,
      query: query
    })
  },

  deleteStuffs: function (key) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.DELETE_STUFFS,
      key: key,
    })
  },

  getDataValue: function (data) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.GET_DATA,
      data: data,
    })
  },

  refreshResult: function (streamIdx, post, keyword, query) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.REFRESH_RESULT,
      streamIdx: streamIdx,
      post: post,
      keyword: keyword,
      query: query
    })
  },

  hintLoad: function(hintTitles){
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.LOAD_HINT,
      hintTitles: hintTitles
    })
  }



};

module.exports = FluxCartActions;
