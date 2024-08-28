export const isAuthorized = (req, res, next) =>{
    if(!req.session.admin){  //false
      return  next();
    }
    return res.render("adminPanel");
}



export const isAdmin = (req, res, next) =>{
    if(req.session.admin){  //true
      return next();
    }
    return res.redirect("/admin/login");
}