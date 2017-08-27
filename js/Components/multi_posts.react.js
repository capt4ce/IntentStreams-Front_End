var React = require('react');
var Post = require('./post.react.js');


var Multi_Post = React.createClass({

  render: function () {

    var posts = (this.props.posts).map(function (post, i) {
      console.log(post)
      return (
        <Post
          key={i}
          post={post} />
      );

    });
    console.log("buh")
    return (
      <div className='post' id='postList'>
        {posts}
      </div>
    );

  }

});

module.exports = Multi_Post;
