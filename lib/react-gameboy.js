//var React = require('react');
var gameboy = require('gameboy');

var Gameboy = React.createClass({
  getInitialState: function() {
    return {
      running: false
    }
  },
  render: function() {
    return (
      <canvas className='gameboy' ref='gameboy'></canvas>
    );
  },
  startEmulator: function(romData, opts) {
    if (!romData) return;

    var canvasEl = this.refs.gameboy.getDOMNode();
    this.gb = gameboy(canvasEl, romData, opts);
    this.gb.stopEmulator = 1;
    this.gb.start();

    this.setState({running: true});
  },
  componentDidMount: function() {
    this.startEmulator(this.props.romData, this.props.opts);
  },
  componentDidUpdate: function() {
    var self = this;
    (function animLoop() {
      if (!self.state.running) return;

      requestAnimationFrame(animLoop);
      self.gb.run();
    })();
  },
  componentWillReceiveProps: function(nextProps) {
    this.startEmulator(nextProps.romData, nextProps.opts);
  }
});

module.exports = Gameboy;
