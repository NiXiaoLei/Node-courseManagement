// 引入 session 模块
const session = require('express-session')

const methodOverride = require('method-override')

// 引入 flash 模块
const flash = require('connect-flash')

const bodyParser = require('body-parser')

const exphbs  = require('express-handlebars');


const passport = require("passport")


module.exports = (mongoose,app)=>{


    // 连接Mongoose
    // 这也是个Promise 对象
    mongoose.connect("mongodb://nxl:q12345@ds247830.mlab.com:47830/course")
    .then(()=>{
        console.log("MongoDB conncted")
    })
    .catch(err=>{
        console.log(err)
    })


    // 配置handlebars 模板引擎
    app.engine('handlebars', exphbs({
        defaultLayout: 'main'
    }));
    app.set('view engine', 'handlebars');

    // 配置 session 
    app.use(session({
        // 自定义加密的字符串
        secret: 'nxl',
        resave: true,
        saveUninitialized: true
    }))

    app.use(passport.initialize());
    app.use(passport.session());

    // 配置 flash
    app.use(flash())

    // 配置  flash 全局变量
    app.use((req, res, next)=>{
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        // 为了使用passport 时带有提示.所以加一条配置
        res.locals.error = req.flash('error')
        res.locals.user = req.user || null
        next()
    })




    // 配置 body-parser
    // 只对单独路由使用  这个方式
    // var jsonParser = bodyParser.json()
    // var urlencodedParser = bodyParser.urlencoded({ extended: false })

    // body-parser 全局使用
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    // 配置method-override
    app.use(methodOverride('_method'))



}
