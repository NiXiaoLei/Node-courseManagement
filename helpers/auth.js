// 导航守卫
module.exports = {
    ensureAuthenticated:(req, res, next)=>{
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("error_msg","请先登入")
        res.status(400).redirect("/users/login")
    }
}