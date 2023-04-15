/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');
const cssLoader = 'css-loader';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: ['autoprefixer']
    }
  }
};

module.exports = function(env, { analyze }) {
  const production = env.production || process.env.NODE_ENV === 'production';
  return {
    target: 'web',
    mode: production ? 'production' : 'development',
    devtool: production ? undefined : 'eval-cheap-source-map',
    entry: {
      entry: './src/main.ts'
      // 'bootstrap': path.join(__dirname, "src/plugins/scss/bootstrap.scss"),
      // 'app.core' : path.join(__dirname, "src/plugins/scss/app.core.scss"),
      // 'theme.demo': path.join(__dirname, 'src/plugins/scss/theme-demo.scss'),
      // 'skin-master': path.join(__dirname, 'src/plugins/scss/_skins/skin-master.scss')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: production ? '[name].[contenthash].bundle.js' : '[name].bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, './node_modules'), 'node_modules'],
      alias: production ? {
        // add your production aliasing here
      } : {
        ...[
          'fetch-client',
          'kernel',
          'metadata',
          'platform',
          'platform-browser',
          'plugin-conventions',
          'route-recognizer',
          'router',
          'router-lite',
          'runtime',
          'runtime-html',
          'testing',
          'webpack-loader',
        ].reduce((map, pkg) => {
          const name = `@aurelia/${pkg}`;
          map[name] = path.resolve(__dirname, './node_modules', name, 'dist/esm/index.dev.mjs');
          return map;
        }, {
          'aurelia': path.resolve(__dirname, './node_modules/aurelia/dist/esm/index.dev.mjs'),
          // add your development aliasing here
        })
      }
    },
    module: {
      rules: [
        // {
        //   test: /\.(ico|jpg|jpeg|png|gif|svg)(\?.*)?$/,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       // options: {
        //       //   name: '[path][name].[ext]',
        //       //   //context: 'src'
        //       // }
        //     }
        //   ]
        // },
        { test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=\d\.\d\.\d)?$/i,  type: 'asset' },
        { test: /\.(scss|css)$/i, use: [
            {
              loader: MiniCssExtractPlugin.loader,
              // options: {
              //   hmr: true//isDevelopment? true: false,
              // }
            },

            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            postcssLoader,
            {
              loader: 'sass-loader',
              options: {
                webpackImporter: true,
              }
            }
          ],
        },
        { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/ },
        {
          test: /[/\\]src[/\\].+\.html$/i,
          use: {
            loader: '@aurelia/webpack-loader',
            // options: {
            //   defaultShadowOptions: { mode: 'open' }
            // }
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.html', favicon: 'favicon.ico' }),
      new Dotenv({
        path: `./.env${production ? '' :  '.' + (process.env.NODE_ENV || 'development')}`,
      }),
      analyze && new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({
        filename:  "assets/css/[name].css",
        //chunkFilename: 'dev-dist/[id].css',
      }),
    ].filter(p => p),

    devServer: {
      https: false,
      port: 9000,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: true,
      //contentBase: './dist',
      // ws: true,
      // proxy: {
      //   "/api": {
      //     "changeOrigin": true,
      //     "secure": false,
      //     "cookieDomainRewrite": "localhost",
      //     "target": 'https://localhost:3000',
      //     ws: true,
      //     onProxyReq: proxyReq => {
      //       if (proxyReq.getHeader('origin')) {
      //         proxyReq.setHeader('origin', 'https://localhost:3000');
      //       }
      //     }
      //   }
      // }
    },
  }

}
