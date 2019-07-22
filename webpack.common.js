const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            /**
             * Used for importing images into React files.
             */
            {
                test: /\.(png|jpe?g)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            },
    
            /**
             * Used for importing & compiling SASS.
             */
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    }
};
