// const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const RazorPartialViewsWebpackPlugin = require("razor-partial-views-webpack-plugin");

const bundleFileName = 'main';
const dirName = 'wwwroot/dist';

module.exports = (env, argv) => {
    return {
        entry: ['./src/index.js', './src/sass/index.scss'],
        output: {
            filename: bundleFileName + ".js",
            path: path.resolve(__dirname, dirName)
        },
        devServer: {
            // output assets to disk for ASP.NET
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
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: bundleFileName + '.js'
            }),
            new RazorPartialViewsWebpackPlugin({
                rules: [{
                    // view for default chunk
                    name: "main",
                    template: {
                        // Razor directive
                        header: "@inherits System.Web.Mvc.WebViewPage"
                    }
                }]
            })
        ]
    }
}
