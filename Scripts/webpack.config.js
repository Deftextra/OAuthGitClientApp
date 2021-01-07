const path = require('path');
const fs = require("fs");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const RazorPartialViewsWebpackPlugin = require("razor-partial-views-webpack-plugin");

module.exports = (env, argv) => {
    return {
        entry: './src/index.js',
        output: {
            filename: "main.js",
            path: path.resolve(__dirname, "dist"),
            publicPath: "https://localhost:8080/dist"
        },
        devServer: {
            writeToDisk: true,
            overlay: true,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            https: true,
            cert: fs.readFileSync("./localhost.pem"),
            key: fs.readFileSync("./localhost-key.pem")
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
