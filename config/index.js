'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 代理设置
    proxyTable: {
        '/api':{
            target:'http://localhost:9690/security/',//设置你调用的接口域名和端口号
            changeOrigin: true, //跨域
            pathRewrite:{
                 ///这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
                //比如我要调用'http://localhost:3333/xxx/duty?time=2017-07-07 14:57:22'，
                //直接写‘/api/xxx/duty?time=2017-07-07 14:57:22’即可
                //在开发环境显示地址：http://localhost:8081/api/xxx/duty?time=2017-07-07 14:5
                '^/api':'/'  
            }
        }       
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',//js、css资源路径  boot下 不需要设置

    assetsPublicPath: '/',//需要打包项目名称即tomcat下的文件夹  boot下 不需要设置
    /**
     * Source Maps
     */

    productionSourceMap: true,//开发时默认true 发布false
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
