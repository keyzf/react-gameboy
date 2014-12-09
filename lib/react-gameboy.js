//var React = require('react');
var gameboy = require('gameboy');

// right, left, up, down, a, b, select, start
var keymap = [ 39, 37, 38, 40, 65, 83, 79, 13];

var Gameboy = React.createClass({
  getDefaultProps: function() {
    return {
      opts: {}
    };
  },
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
    addEventListener('keydown', this.onKeyDown);
    addEventListener('keyup', this.onKeyUp);
  },
  componentDidUpdate: function() {
    var self = this;
    (function animLoop() {
      if (!self.state.running) return;

      setTimeout(animLoop, 8);
      self.gb.run();
    })();
  },
  componentWillReceiveProps: function(nextProps) {
    this.startEmulator(nextProps.romData, nextProps.opts);
  },
  onKeyDown: function(e) {
    var key;
    if (!this.state.running || (key = keymap.indexOf(e.keyCode))===-1) return;

    this.gb.JoyPadEvent(key, true);
    e.preventDefault();
  },
  onKeyUp: function(e) {
    var key;
    if (!this.state.running || (key = keymap.indexOf(e.keyCode))===-1) return;

    this.gb.JoyPadEvent(key, false);
    e.preventDefault();
  }
});

module.exports = Gameboy;
