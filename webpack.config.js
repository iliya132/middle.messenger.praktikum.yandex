const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-bundle.js'
    },
    plugins: [new HtmlWebpackPlugin(
        {
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html'
        })],
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.min.js',
            'postcss': 'postcss/dist/postcss.min.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use:
                    [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(__dirname, 'tsconfig.json')
                            }
                        }
                    ],
                exclude: /node_modules/
            },
            {
                test: /\.png$/,
                use: 'url-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'postcss-loader'
                ]
            }
        ]
    }

}