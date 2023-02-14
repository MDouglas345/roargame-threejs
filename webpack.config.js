
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')






module.exports = {
    mode : "development",
    entry : path.resolve(__dirname, './src/index.js'),
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : "index.js",
        assetModuleFilename : '[name][ext]'
    },
    devServer : {
        static : {
            directory : path.resolve(__dirname, "dist"),
        },
        open : true,
        hot : true,
        compress : true,
        historyApiFallback : true,
        allowedHosts : 'all'
    },
    module :{

        rules : [ 
            {
                test :/\.(png|svg)$/i,
                type : 'asset/resource',
                
                

            },
            {
                test : /\.scss$/,
                use : [
                    'style-loader',
                    'css-loader',
                    'sass-loader'

                ]
            },
            
        ],
    },
    plugins : [
        new HtmlWebpackPlugin({
            title : "Roar",
            filename : "index.html",
            template : "src/template.html",
            
        }),
        
    ]
}