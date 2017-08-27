var React = require('react');
var Render = require('react-dom').render;
var FluxCartApp = require('./Components/stream_app.react.js');


// Render FluxCartApp Controller View
Render(
  <FluxCartApp />,
  document.getElementById('flux-stream')
);
