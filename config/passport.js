const LocalStrategy = require("passport-local").Strategy

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// 加载model
const  User = require('./../models/User')

module.exports = (passport) => {
    // local 是加密方式中的一种
    // 使用中间件实例化一个 LocalStrategy  就是再其他地方校验时使用的 local  在外部执行校验后就会进来使用这里中间件的方法
    passport.use(new LocalStrategy(
        // 这是个特别提示 放我们要验证的东西
        {usernameField:"email"},
        (email,password,done) => {
            User.findOne({email:email})
            .then((data)=>{
                if(!data){
                //    这里不使用flash 了,这里使用我们的done 函数
                // 三个参数   你是否传对应的内容,你得到对应的user,如果你出现错误会给我们提供一个msg
                    return done(null,false,{message:"没有这个用户!"})
                }
    
                // 密码验证
                bcrypt.compare(password, data.password, function(err, isMatch) {
                    if(err) throw err
                    if(isMatch){
                        return done(null, data)
                    }else{
                        return done(null,false,{message:"用户名或密码错误!"})
                    }
                });
            })


        }
    ));


    // 序列化 和 反序列化  让我的数据持久化
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
       
      passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
      });

}