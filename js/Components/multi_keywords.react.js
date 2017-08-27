var React = require('react');
var Keyword = require('./keyword.react.js');


var Multi_Keyword = React.createClass({


  render: function () {

    var keywords = (this.props.keywords).map(function (keyword, i) {
      console.log(keyword)
      return (
        <Keyword
          key={i}
          keyword={keyword} />
      );

    });

    return (
      <div className='keyword' id='keywordList'>
        {keywords}
      </div>
    );

  }

});

module.exports = Multi_Keyword;
