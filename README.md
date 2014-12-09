# react-gameboy

A component to emulate and play gameboy roms. Emulator used is Grant Galitz's [GameBoy-Online](https://github.com/grantgalitz/GameBoy-Online).

## Installation

```bash
npm i -S react-gameboy
```

## Usage

```javascript
var React = require('react');
var Gameboy = require('react-gameboy');

var Component = React.createClass({
  render: function() {
    return (
      <Gameboy romData={this.props.romData} opts={this.props.opts}/>
    );
  }
});
```

## Todo
* Import and export save states
* Package audio dependency (currently requires external [dependency](https://github.com/grantgalitz/XAudioJS))
* Support Gamepad API
* Add emulation speed control
