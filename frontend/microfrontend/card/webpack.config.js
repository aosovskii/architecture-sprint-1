const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3003,
        historyApiFallback: true
    },
    output: {
        publicPath: 'auto',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack', 'url-loader'],
            }
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: 'places',
            filename: 'remoteEntry.js',
            exposes: {
                './Cards': './src/components/Cards',
                './AddPlace': './src/components/AddPlace',
            },
            shared: { react: { singleton: true }, "react-dom": { singleton: true }, "react-router-dom": { singleton: true } },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
