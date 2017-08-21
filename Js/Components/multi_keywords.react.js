var React = require('react');
var Keyword = require('./post.react.js');


var Multi_Keyword = React.createClass({

	
     // componentDidUpdate : function(){
     // 	var objDiv = document.getElementById('messageList');
    	// objDiv.scrollTop = objDiv.scrollHeight;
     // },

     render : function(){

              var keywords = (this.props.keywords).map(function(keyword,i){

                   return(
                      <Keyword
			            key={i}
			            keyword={message.keyword} />
                   	);

              });

               return (
			      <div className='keyword' id='keywordList'>
			        { keywords }
			      </div>
			    );

     }

});

module.exports = Multi_Keyword;
