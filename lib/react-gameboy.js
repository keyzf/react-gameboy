//var React = require('react');
var gameboy = require('gameboy');
var romData = require('../after burst.rom').rom;

var Gameboy = React.createClass({
  render: function () {
    return (
      <canvas ref='gameboy'></canvas>
    );
  },
  componentDidMount: function() {
    var canvasEl = this.refs.gameboy.getDOMNode();
    gameboy(canvasEl, romData, {gbBootRom:true});
  }
});

module.exports = Gameboy;
