var React = require('react');
var Keyword = require('./keyword.react.js');

console.log('aaanjcs')

var Multi_Keyword = React.createClass({
  
  handleClick: function (e) {
    e.stopPropagation()
  },

  render: function () {
    console.log('aaa')
    let _this=this
    var keywords = (this.props.keywords).map(function (keyword, i) {
      return (
        <Keyword
          key={i}
          keyword={keyword} 
          streamKey={_this.props.streamKey}
          handleClosePop={_this.props.handleClosePop} 
          handleOpenPop={_this.props.handleOpenPop}
          />
      );

    });
    
    return (
      <div  className='keyword' id='keywordList' onClick={this.handleClick}>
        {this.props.query + ":"}
        {keywords}
      </div>
    );

  }

});

module.exports = Multi_Keyword;
