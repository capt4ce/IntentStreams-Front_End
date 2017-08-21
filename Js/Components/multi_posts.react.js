var React = require('react');
var Post = require('./post.react.js');


var Multi_Post = React.createClass({

	
     // componentDidUpdate : function(){
     // 	var objDiv = document.getElementById('messageList');
    	// objDiv.scrollTop = objDiv.scrollHeight;
     // },

     render : function(){

              var posts = (this.props.posts).map(function(post,i){

                   return(
                      <Post
			            key={i}
			            post={message.post} />
                   	);

              });

               return (
			      <div className='post' id='postList'>
			        { posts }
			      </div>
			    );

     }

});

module.exports = Multi_Post;
