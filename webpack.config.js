const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

function srcPath(...subdir) {
    return path.join(__dirname, "src", ...subdir);
}

let options = {
    target: "electron-renderer",
    entry: {
        home: path.resolve(__dirname, 'src','index.tsx')
    },
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'app'),
        filename: 'js/[name].js',
        publicPath: ''
    },
    devServer: {
        hot: true,
        port: 9000,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
                use: {
                    loader :'url-loader',
                    options: {
                        limit: 90000
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
        alias: {
            hooks: srcPath('hooks'),
            components: srcPath('components'),
            reduxPath: srcPath('redux'),
            entitys: srcPath('electron', "entitys"),
            entitys: srcPath('assets')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack-dev-server',
            template: path.resolve(__dirname, 'index.html')
        })
    ]
}

module.exports = options;
