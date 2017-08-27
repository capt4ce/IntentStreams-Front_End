var React = require('react');
var Multi_Post = require('./multi_posts.react.js');


var Container_Post = React.createClass({

  render: function () {

    var cposts = (this.props.cposts).map(function (posts, j) {
      return (
        <Multi_Post
          key={j}
          posts={posts.post} />
      );

    });

    return (
      <div className='cpost' id='cpostList'>
        {cposts}
      </div>
    );

  }

});

module.exports = Container_Post;
