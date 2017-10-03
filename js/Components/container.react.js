var React = require('react');
var Keyword = require('./keyword.react.js');

var Container = React.createClass({
    
    handleClick: function (e) {
        e.stopPropagation()
      },
    
      render: function () {
        console.log('aaa')
        // var keywords = (this.props.keywords).map(function (keyword, i) {
       
        //   return (
        //     <Keyword
        //       key={i}
        //       keyword={keyword} />
        //   );
    
        // });
    
        // if (this.props.keywords.length == 0)
        //   return null;
    
        return (
          <div  className='keyword' id='keywordList' onClick={this.handleClick}>
            {/* {keywords} */}
            <h1>asad</h1>
          </div>
        );
    }
});

module.exports = Container;