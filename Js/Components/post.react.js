var React = require('react');

var Post = React.createClass({

      render : function() {
      	return(
               <div className='post-body'>
			          { this.props.post}
			      </div>
      		);
      }

});

module.exports = Post;
