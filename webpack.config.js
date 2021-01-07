const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const RazorPartialViewsWebpackPlugin = require("razor-partial-views-webpack-plugin");

const publicName = '/wwwroot/'
const bundleFileName = 'main';
const dirName = 'dist';

module.exports = (env, argv) => {
    return {
        entry: './src/index.js',
        output: {
            filename: "main.js",
            path: path.resolve(__dirname, "wwwroot/dir"),
            publicPath: "https://localhost:8080"
        },
        devServer: {
           writeToDisk: true,
            // clearly display errors
            overlay: true,
            // include CORS headers
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            // use self-signed certificate
            https: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new RazorPartialViewsWebpackPlugin({
                rules: [{
                    name: "main"
                }]
            })
        ]
    }
}
