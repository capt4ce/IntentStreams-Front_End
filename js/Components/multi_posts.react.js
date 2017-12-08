var React = require('react');
var Post = require('./post.react.js');


var Multi_Post = React.createClass({

  handleClick: function (e) {
    e.stopPropagation()
  },

  render: function () {
   let _this=this
    var posts = (this.props.posts).map(function (post, i) {
      return (
        <Post
          key={i}
          streamKey={_this.props.streamKey}
          post={post} />
      );

    });
  

    if (this.props.posts.length == 0)
      return null;

    return (
      <div className='post' id='postList' onClick={this.handleClick}>
        {posts}
      </div>
    );

  }

});

module.exports = Multi_Post;
