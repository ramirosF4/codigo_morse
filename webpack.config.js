const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

    devServer: {
        static: './dist',
        port: 8080,
        open: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                type: 'javascript/auto',
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceType: 'unambiguous',
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};