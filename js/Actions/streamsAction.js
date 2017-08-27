var AppDispatcher = require('../Dispatcher/streamsDispatcher');
var FluxCartConstants = require('../Constants/streamsConstants');

// Define action methods
var FluxCartActions = {

  loadStuffs: function (post,keyword) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.LOAD_STUFFS,
      post: post,
      keyword : keyword
    })
  },

  getDataValue: function (data) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.GET_DATA,
      data: data,
    })
  },

  

};

module.exports = FluxCartActions;
