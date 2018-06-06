# Node 课程管理app

## 模板引擎 express-handlebars

##  Session模块 express-session

##  connect-flash
> 依赖项
> session
***
>  flash 是 session 中一个用于存储信息的特殊区域。消息写入到 flash 中，在跳转目标页中显示该消息。flash 是配置 redirect 一同使用的，以确保消息在目标页面中可用。flash 可用于一次性的消息提示，比如注册，登录页面，当你再次刷新时，flash就没有提示消息了。

### 如何安装
```
npm install connect-flash
```

##  bcrypt
*  加密方式
##  mongoose
* 操作 mongoDB
##  method-override 
* 更改前端发送的请求方式
##  passport
*  权限验证
### 如何安装
***
> 依赖项 
> passport
> passport-local
> express-session
***
> 登录的用户信息存储在服务器的session中，然后访问时从session中获取用户信息，如果没有获取到用户信息，则认为该请求非法，以上，集成passport之后，会全自动完成，无须人工干预。
```
npm install passport --save
npm install passport-local --save
npm install express-session --save
```


