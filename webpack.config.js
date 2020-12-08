const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '/public/javascripts'),
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
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
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
        new VueLoaderPlugin
    ]
}