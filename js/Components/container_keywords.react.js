var React = require('react');
var Multi_Keyword = require('./multi_keywords.react.js');


var Container_Keyword = React.createClass({

     render : function(){

              var ckeyword = (this.props.ckeyword).map(function(keyword,j){

                   return(
                      <Multi_Keyword
			            key={j}
			            keywords={keyword.keyword} />
                   	);

              });
console.log("bcu")
               return (
			      <div className='ckeyword' id='ckeywordList'>
			        { ckeyword }
			      </div>
			    );

     }

});

module.exports = Container_Keyword;
