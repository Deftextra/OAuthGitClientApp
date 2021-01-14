const path = require('path');
const fs = require("fs");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const RazorPartialViewsWebpackPlugin = require("razor-partial-views-webpack-plugin");

module.exports = (env, argv) => {
    return {
        resolve: {
            alias: {
                Images: path.resolve(__dirname, 'src/assets/images/')
            }
        },
        entry: {
            index:
            {
                import: './src/pages/index/index.js',
                filename: 'pages/index/index.js'
            },
            profile: 
            {
                import: './src/pages/profile/profile.js',
                filename: 'pages/profile/profile.js'
            },
            layout: {
                import: './src/pages/shared/layout/layout.js',
                filename: 'pages/shared/layout/layout.js'
            }

        },
        output: {
            path: path.resolve(__dirname, "dist"),
            publicPath: "https://localhost:8080/dist"
        },
        devtool: false,
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
        optimization: {
            runtimeChunk: 'single',
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
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new RazorPartialViewsWebpackPlugin({
                rules: [
                    {
                        test: /.*\.js$/,

                        template: {
                            using: ["System", "System.Web"],
                            model: "dynamic",
                            footer: () => `@* View generated ${new Date().toISOString()} *@`,
                        },
                        output: {

                            name: defaultName => `generated-${defaultName}`,
                            path: "../Pages/_GeneratedViews/"
                        }
                    }
                ],
            })
        ]
    }
}
