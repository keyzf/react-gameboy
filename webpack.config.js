module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/react-gameboy.js',
    sourceMapFilename: './dist/react-gameboy.map',
    library: 'Gameboy',
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'React',
    'react/addons': 'React'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
