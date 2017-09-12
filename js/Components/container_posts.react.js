var React = require('react');
var Multi_Post = require('./multi_posts.react.js');
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


var Container_Post = React.createClass({

  handleClick: function (e) {
    e.stopPropagation()
  },

  render: function () {

    var cposts = (this.props.cposts).map(function (posts, j) {
      return (
        <Multi_Post
          key={j}
          posts={posts.post} />
      );

    });

    if (this.props.cposts.length == 0)
      return null;

    return (
      <Row className="show-grid">
        <Col xs={3} className="hello">
          <div className='cpost' id='cpostList' onClick={this.handleClick}>
            {cposts}
          </div>
        </Col>

      </Row>
    );

  }

});

module.exports = Container_Post;
