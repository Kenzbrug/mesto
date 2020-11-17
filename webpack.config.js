const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/',
    },
    
    devtool: 'inline-source-map',
    module: {
        rules: [            
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', {
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }]
                  }
                }
              },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(png|svg|jpg|gif|jpe?g)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
            {
                test: /\.(eot|ttf|woff2|woff|)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },      
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
          }),
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов
    ]
}