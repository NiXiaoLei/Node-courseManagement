const express = require("express")
const mongoose = require('mongoose')

let Router = express.Router()





Router
// 首页
.get('/',(req,res) => {
    const title = "大家好"
    console.log("================================================")
    console.log(req.user)
    res.render("index",{
        title:title
    })
})

// 关于我们
.get('/about',(req, res) => { 
    res.render("about")
})


module.exports = Router