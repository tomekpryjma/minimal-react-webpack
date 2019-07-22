const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

module.exports = (env) => {

    // Get the project root path (assumes the webpack config is at root level).
    const currentPath = path.join(__dirname);

    // Create the fallback path.
    const basePath = currentPath + "/.env";

    const envPath = basePath + "." + env.ENVIRONMENT;

    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    const fileEnv = dotenv.config({path: finalPath}).parsed;

    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {})

    return {
        entry: './src/index.js',
        module: {
            rules:[
    
                /**
                 * Used for compiling React files into vanilla JS.
                 */
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
        },
        devServer: {
            contentBase: './dist'
        },
        plugins: [
            new webpack.DefinePlugin(envKeys)
        ]
    }
}