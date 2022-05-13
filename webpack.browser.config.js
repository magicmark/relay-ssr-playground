const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/browser.js',
    output: {
        path: path.resolve(__dirname, 'build', 'browser'),
        filename: 'browser.bundle.js',
    },
    // plugins: [new HtmlWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
