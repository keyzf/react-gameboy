var React = require('react');
var gameboy = require('gameboy');
var XAudioServer = require('XAudioJS');

var buttons = ['right', 'left', 'up', 'down', 'a', 'b', 'select', 'start'];

var Gameboy = React.createClass({
  getDefaultProps: function() {
    return {
      opts: {
        sound: XAudioServer
      },
      running: false,
      speed: 1,
      volume: 1
    };
  },

  getInitialState: function() {
    return {
      running: this.props.running
    }
  },

  render: function() {
    return (
      <canvas className='gameboy' ref='gameboy'></canvas>
    );
  },

  componentDidMount: function() {
    this.start();
  },

  componentDidUpdate: function(prevProps, prevState) {
    var self = this;

    if (prevProps.romData !== this.props.romData) {
      if (this.state.running) this.stop();
      this.start();
    }
    if (prevProps.volume !== this.props.volume) {
      this.gb.audioHandle && this.gb.audioHandle.changeVolume(this.props.volume);
    }
    
    clearTimeout(this.loopId);

    (function animLoop() {
      if (!self.state.running) return;

      var duration = 8 / self.props.speed;
      self.loopId = setTimeout(animLoop, duration);
      self.gb.run();
    })();
  },

  componentWillReceiveProps: function(nextProps) {
    if (!this.gb) return;

    for (var button in nextProps.gamepad) {
      var buttonId = buttons.indexOf(button);
      if (buttonId < 0) return;

      this.gb.JoyPadEvent(buttonId, this.props.gamepad[button]);
    }
  },

  componentWillUnmount: function() {
    this.stop();
  },

  pause: function() {
    this.setState({running: false});
  },

  resume: function() {
    this.setState({running: true});
  },

  start: function() {
    if (!this.props.romData) return;

    var canvasEl = this.refs.gameboy.getDOMNode();
    this.gb = gameboy(canvasEl, this.props.romData, this.props.opts);
    this.gb.stopEmulator = 1;
    this.gb.start();
    this.gb.audioHandle && this.gb.audioHandle.changeVolume(this.props.volume);

    this.setState({running: true});
  },

  stop: function() {
    this.setState({running: false});
    clearTimeout(this.loopId);
  },

  getSaveState: function() {
    return this.gb.saveState();
  },

  openSaveState: function(saveState) {
    this.gb.returnFromState(saveState);
  }
});

module.exports = Gameboy;
