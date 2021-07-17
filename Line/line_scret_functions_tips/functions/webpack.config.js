// functions/webpack.config.js
const pkg = require('../package')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')

// Set externals that you don't want to build by webpack
const externals = [
  'firebase-admin',
  'firebase-functions'
]

const genPackage = () => ({
  name: 'functions',
  private: true,
  main: 'index.js',
  license: 'MIT',
  dependencies: externals.reduce(
    (acc, name) =>
      Object.assign({}, acc, {
        [name]:
          pkg.dependencies[name] ||
          pkg.devDependencies[name]
      }),
    {}
  )
})

module.exports = {
  entry: [__dirname + '/index.js'],
  output: {
    path: __dirname + '/_dist',
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: externals.reduce(
    (acc, name) => Object.assign({}, acc, { [name]: true }),
    {}
  ),
  plugins: [new GenerateJsonPlugin('package.json', genPackage())]
}