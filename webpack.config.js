// 导入处理路径的模块
var path = require('path');
/*let webpack=require("webpack");*/


let htmlwebpackPlagin=require("html-webpack-plugin");
// 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
module.exports = {
    //配置打包模式为开发模式
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'), // 项目入口文件
    output: { // 配置输出选项
        path: path.resolve(__dirname, 'dist'), // 配置输出的路径
        filename: 'main.js' // 配置输出的文件名
    },
    plugins:[
        new htmlwebpackPlagin({
            template:path.join(__dirname,"./src/index.html"),
            filename: "index.html"
        })
    ],
    module: {/*配置所有第三方模块*/
        //匹配第三方模块规则
        rules:[
            {test:/\.css$/,use:["style-loader","css-loader"]},
            {test:/\.less$/,use:["style-loader","css-loader","less-loader"]},
            {test:/\.scss$/,use:["style-loader","css-loader","sass-loader"]},
            {test:/\.(png|jpg|gif|jpeg|bmp)$/,use:"url-loader?limit=10077&name=[hash:8][name].[ext]"},
            {test:/\.js$/,use: 'babel-loader', exclude: /node_modules/},
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:"url-loader"},
            { test: /\.vue$/, use: 'vue-loader' }

        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    }
}