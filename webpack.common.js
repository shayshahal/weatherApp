const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/DOM/index.js",
    },
    plugins: [
    new HtmlWebpackPlugin({
        title: "Weather App",
        template: "/src/DOM/index.html",
        filename: 'index.html'
    }),
    ],
    output: {
        filename: "[name][contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    }
};