const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let ip = require('ip');

module.exports = {
    entry: {
        app: ['babel-polyfill', './preview.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$|\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.js?$|\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true,
        port: 9000,
        host: ip.address()
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html',
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'moment': 'moment',
    },
    resolve: {
        alias: {
            Root: path.resolve(__dirname)
        }
    }
};