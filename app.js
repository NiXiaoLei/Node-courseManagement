const express = require("express")
const app = express()
const mongoose = require("mongoose")

const passport = require("passport")


require('./config/passport')(passport)
let static = require('./static')(express,app)

//配置各种中间件 代码抽离
let config = require('./config/thirdParty')(mongoose,app)



// 挂载路由
// 抽离了路由代码,并且简化路径编写
app.use(require('./router/basics'))
app.use('/users',require('./router/users'))
app.use('/ideas',require('./router/ideas'))



//判断是否时生产环境   process.env.NODE_ENV == "production"


// 设置端口号 如果在服务器上就使用服务器的端口号
const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server started on localhost:${port}`)
})
