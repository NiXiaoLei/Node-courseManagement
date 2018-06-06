/** 
 * 开放静态文件
*/
const path = require('path')
module.exports = (express,app) =>{
    // require 路径是没关系的.但是 开放文件,操作文件一定要 使用动态的绝对路径
    app.use('/public/',express.static(path.join(__dirname,'public')))
} 