const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin  } = require('vue-loader')

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/javascripts'),
        publicPath: '/javascripts'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.[c/sa/sc]ss$/,
            use: [
                process.env.NODE_ENV !== "production"
                  ? "style-loader"
                  : MiniCssExtractPlugin.loader,
                  {
                    loader: "css-loader",
                    options: {
                      sourceMap: true,
                    },
                  },
                  {
                    loader: "sass-loader",
                    options: {
                      sourceMap: true,
                    },
                  },
              ],
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    devServer: {
        overlay: true,
        open: true
    },
    plugins: [
        new VueLoaderPlugin,
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        })
    ]
}