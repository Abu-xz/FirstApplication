export const userAuth = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect("/user/login");
  }
  next();
};

// export const loginAuth = (req, res, next) => {
//   if (req.session.username) {
//     return res.redirect("/user/index");
//   }
//   next();
// };

export const isAuthorized = (req, res, next) => {
 console.log(req.session.username)
  if (req.session.username) {
    return res.redirect("/user/index");
  }
  next();
};
