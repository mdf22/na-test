

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: ['autoprefixer']
        }
    }
};

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-webpack',
            'karma-coverage',
            'karma-chrome-launcher',
        ],
        // list of files / patterns to load in the browser
        files: [
            {
                pattern: './src/**/*.spec.ts',
                type: 'js'  // to silence the warning. Means load with <script> tag
            },
        ],
        // list of files / patterns to exclude
        exclude: [],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './src/**/*.ts': ['webpack']
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],
        webpack: {
            // files: {
            //     path: path.resolve(__dirname, 'dist'),
            //     filename:  'src/**/*.spec.ts',
            // },
            mode: 'development',
            resolve: {
                extensions: ['.ts', '.js'],
                modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dev-app'), 'node_modules',path.resolve(__dirname, '../../node_modules')],
                alias:  {
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
                        map[name] = path.resolve(__dirname, '../../node_modules', name, 'dist/esm/index.dev.mjs', );
                        return map;
                    }, {
                        'aurelia': path.resolve(__dirname, '../../node_modules/aurelia/dist/esm/index.dev.mjs'),
                        // add your development aliasing here
                    })
                }
            },
            module: {
                rules: [
                    { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset' },
                    { test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=\d\.\d\.\d)?$/i,  type: 'asset' },
                    { test: /\.(scss|css)$/i, use: [ 'style-loader', 'css-loader', postcssLoader, 'sass-loader'] },
                    { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/ },
                    {
                        test: /[/\\]src[/\\].+\.html$/i,
                        use: '@aurelia/webpack-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({ template: 'index.html', favicon: 'favicon.ico' }),
            ].filter(p => p)
        },
        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
