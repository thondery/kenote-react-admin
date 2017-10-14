// ------------------------------------
// Webpack Config For Version 3.x
// ------------------------------------
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const pkg = require('./package.json')

const __DESKTOP__ = pkg.React.desktop
const contextPath = __DESKTOP__ ? '' : '/'
const assets = []
const isManifest = fs.existsSync('./dll/manifest.json')
if (isManifest) {
  const manifest = require('./dll/manifest.json')
  for (let ext of ['js', 'css']) {
    fs.existsSync(`./dist/${manifest.name}.${ext}`) && assets.push(`${contextPath}${manifest.name}.${ext}`)
  }
}
assets.push(`${contextPath}index.bundle.js`)
assets.push(`${contextPath}index.css`)

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const scssLoader = [
  {
    loader: 'css-loader?minimize',
    options: {
      sourcemap: true
    }
  },
  {
    loader: 'postcss-loader',
  },
  {
    loader: 'sass-loader',
    options: {
      sourcemap: true
    }
  }
]
if (isDev) {
  _.find(scssLoader, { loader: 'postcss-loader' }).options = {
    autoprefixer : {
      add      : true,
      remove   : true,
      browsers : ['last 2 versions']
    }
  }
}


module.exports = {
  context: path.resolve(__dirname, 'src'),
  cache: true,
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: ''
  },
  plugins: _.compact([
    new webpack.DllReferencePlugin({
      context: __dirname,
			manifest: require('./dll/manifest.json')
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
      '__DESKTOP__': __DESKTOP__
    }),
    isProd && new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false
      },
    }),
    new HtmlWebpackPlugin({
      title    : pkg.name,
      template : path.resolve(__dirname, 'src/index.html'),
      favicon  : path.resolve(__dirname, 'public/favicon.ico'),
      filename : 'index.html',
      inject   : 'body',
      hash     : true,
      excludeChunks   : ['index'],
      minify   : {
        collapseWhitespace : false
      }
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: assets,
      append: false,
      hash: true
    }),
    isDev && new webpack.HotModuleReplacementPlugin(),
    isProd && new webpack.optimize.AggressiveMergingPlugin(),
    isProd && new webpack.optimize.ModuleConcatenationPlugin(),
    new LodashModuleReplacementPlugin({
      'shorthands'  : true,
      'collections' : true,
    }),
  ]),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true'
      },
      {
        test : /\.json$/,
        use : [
          'json-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap&-minimize'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: scssLoader,
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]?[hash]'
        }
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]'
        }
      }
    ],
    noParse: [
      /moment-with-locales/,
      /node_modules\/localforage\/dist\/localforage.js/
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    hot: true,
    port: 3000,
    historyApiFallback: true,
    publicPath: ''
  }
}