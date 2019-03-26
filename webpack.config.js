const path = require("path");

module.exports = {
    entry: './client/main.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        publicPath: '/public/js/',
        filename: '[name].bundle.js'
    },
    devtool: 'inline-source-map'
};