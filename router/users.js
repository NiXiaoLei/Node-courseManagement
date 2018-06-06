const express = require("express")
const mongoose = require('mongoose')
const User = require('../models/User')
const passport = require('passport')
// 拿到Router进行操作
let Router = express.Router()

// 加密
const bcrypt = require('bcrypt')


// 将路由操作挂载到 Router
Router
.get('/login',(req,res)=>{
    // 渲染路径前不能加 `/`
    res.render('users/login')
})

.post('/login',(req,res, next)=>{
    passport.authenticate('local', {
        // 成功跳转  貌似加斜杠就是按这里的路径跳转, 不加的话 会根据公开的路径跳转
        successRedirect: '/ideas',
        // 失败跳转
        failureRedirect: '/users/login' ,
        failureFlash: true
    })(req, res, next)
    // 渲染路径前不能加 `/`
   
})
.get("/logout",(req,res) =>{
    // 这个应该是自带的一个方法
    req.logout();
    req.flash("error_msg","退出登陆成功")
    res.status(200).redirect("/users/login")
})

.get("/register",(req,res)=>{
    res.render('users/register')
})

.post("/register",(req,res)=>{
    let errors = [];
    if(req.body.password != req.body.password2){
        errors.push({
            text:"两次密码不一致"
        })
    }

    if(req.body.password.length < 4){
        errors.push({
            text:"密码的长度不能小于4位!"
        })
    }

    if(errors.length > 0){
        // req.flash("error_msg",errors)
        res.render('users/register',{
            errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        })
    }else{
        

        User.findOne({email: req.body.email})
        .then((user)=>{
            if(user){
                req.flash("error_msg","该邮箱已存在,请更换邮箱注册")
                res.status(302).redirect('/users/register')
            }else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password:req.body.password
                })
                // 参数  10=密码强度, 
                bcrypt.genSalt(10, (err, salt)=>{
                    // 传入要加密的数据 
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err) throw err;
                        newUser.password = hash

                        // 存入数据库
                        newUser.save()
                        .then(()=>{
                            req.flash("success_msg","账号注册成功")
                            res.status(302).redirect('/users/login')
                        }).catch(err=>{
                            req.flash("error_msg","账号注册失败")
                            res.status(302).redirect('/users/register')
                        })
                        
                    });
                });
                
            }
        })
    }
})

module.exports = Router