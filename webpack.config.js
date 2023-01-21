
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

let package = require('./src/manifest.json')

function modify(buffer) {
   // copy-webpack-plugin passes a buffer
   var manifest = JSON.parse(buffer.toString());

   // make any modifications you like, such as
   manifest.version = package.version;

   // pretty print to JSON with two spaces
   manifest_JSON = JSON.stringify(manifest, null, 2);
   return manifest_JSON;
}



module.exports = {
    mode : "development",
    entry : path.resolve(__dirname, 'src/index.js'),
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
            {
                test : /\.json$/,
                use :[
                    'json-loader'   
                ]
            }
        ],
    },
    plugins : [
        new HtmlWebpackPlugin({
            title : "Roar",
            filename : "index.html",
            template : "src/template.html",
            manifest : "src/manifest.json"
        }),
        new CopyPlugin({
            patterns :[
                {from : "src/manifest.json", to : "dist",
                    transform (content, path) {
                        return modify(content)
                    }   
                }   
            ]
        })
    ]
}