const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

const ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = ENV === 'development';
console.log('DEV_MODE:', DEV_MODE);

process.noDeprecation = true;

const toFilename = (name, ext = 'js') => {
  const units = [name, '.', ext];
  if (!DEV_MODE) {
    const hashStr = (ext === 'css' ? '-[contenthash]' : '-[chunkhash]');
    units.splice(1, 0, hashStr);
  }
  return units.join('');
};

module.exports = {
  entry: {
    all: ['./src/js/index.js'],
    vendor: ['react', 'react-dom', 'jquery', 'popper.js', 'bootstrap', 'moment']
  },
  output: {
    filename: toFilename('assets/[name]'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve('src/js'),
      path.resolve('src/css'),
      path.resolve('src/img'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react']
          }
        },
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('precss'),
                require('autoprefixer')
              ]
            }
          }, 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: '[path][name].[ext]?[hash:10]',
            },
          },
          {
            loader: 'image-webpack-loader', // 慢，建議用gulp做壓K
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '90-100',
                speed: 4,
              },
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
        include: path.resolve('src/img'),
        exclude:/(node_modules)/,
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEV_MODE ? "'development'" : '"production"',
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!src/index.ejs',
      filename: '../views/index.ejs',
      data: {
        DEV_MODE,
      }
    }),
    new ExtractTextPlugin(toFilename('assets/[name]', 'css')),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
  ]
};