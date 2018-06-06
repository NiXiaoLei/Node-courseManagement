const express = require("express")
const mongoose = require('mongoose')

const Idea = require('../models/Idea')

let Router = express.Router()

const {ensureAuthenticated} = require("../helpers/auth")


Router
// 挂载 路由守卫
.use(ensureAuthenticated)
// 渲染课程列表
.get('/',(req, res, next)=>{
    Idea.find({user: req.user.id })
        // 数据排序
        .sort({date:"desc"})
        .then(ideas =>{
            res.render("ideas/index",{
                ideas
            })
        })
})


// 添加
.get('/add',(req, res) => { 
    res.render("ideas/add")
})

// 编辑
.get("/edit/:id",(req, res) => {
    Idea.findOne({_id:req.params.id})
        .then(idea=>{
            if(idea){
                // req.user.id 存储的就是用户名
                if(idea.user != req.user.id){
                    req.flash("error_msg","非法操作")
                    return res.redirect("/users/login")
                }
                res.render("ideas/edit",{
                    idea
                })
            }
             
        })
   
})

// 添加课程
.post('/',(req, res) => { 
    // console.log(req.body)
    let errors = []
    if(!req.body.title){
        errors.push({text:"请输入标题"})
    }
    if(!req.body.details){
        errors.push({text:"请输入详情"})
    }
    if(errors.length > 0){
        res.render("ideas/add",{
            errors:errors,
            title:req.body.title,
            details:req.body.details
        })
    }else{
        const newUser = {
            title:req.body.title,
            details:req.body.details,
            user: req.user.id
        }
          new Idea(newUser)
            .save()
            .then(result=>{
                req.flash("success_msg","数据添加成功")
                res.redirect('/ideas')
            })
            .catch(err=>{
                console.log(err)
            })
    }
})



//实现编辑
.put('/:id',(req, res, next)=>{
    Idea.findOne({
        _id:req.params.id
    })
    .then(idea=>{
        // 将查询出来的单数据 idea 对象更新,并在下方重新保存
        idea.title = req.body.title
        idea.details = req.body.details

        idea.save()
            .then(result =>{
                req.flash("success_msg","数据编辑成功")
                res.redirect("/ideas")
            })
            .catch(err=>{
                console.log(err)
            })
    })
})


// 实现删除
.delete('/:id',(req, res)=>{
    // console.log(req.params.id)
    Idea.remove({
        _id:req.params.id
    })
    .then(()=>{
        req.flash("success_msg","数据删除成功")
        res.redirect("/ideas")
    })
})




module.exports = Router