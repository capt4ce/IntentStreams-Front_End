var React = require('react');
var Multi_Keyword = require('./multi_keywords.react.js');
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


var Container_Keyword = React.createClass({

  handleClick: function (e) {
    e.stopPropagation()
  },

  render: function () {

    var ckeyword = (this.props.ckeyword).map(function (keyword, j) {

      return (
        <Multi_Keyword
          key={j}
          keywords={keyword.keyword} />
      );

    });

    return (
      <Row className="show-grid">
        <Col xs={3}>
          <div className='ckeyword' id='ckeywordList' onClick={this.handleClick}>
            {ckeyword}
          </div>
        </Col>

      </Row>
    );

  }

});

module.exports = Container_Keyword;
