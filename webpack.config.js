const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = getPort();

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: port,
        historyApiFallback: true
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
            'handlebars': 'handlebars/dist/handlebars.min.js'
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
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    }

}

function getPort(){
    let prt = Number(process.env.port);
    if(Number.isNaN(prt)){
        prt = 3000;
    }
    return prt;
}
