const path = require('path');

module.exports = {
    target: 'node',
    entry: './src/ssr.js',
    output: {
        path: path.resolve(__dirname, 'build', 'ssr'),
        filename: 'ssr.bundle.js',
        library: {
            name: 'ssr_bundle',
            type: 'umd',
        },
    },
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
