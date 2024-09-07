function isAuthenticated(req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

module.exports = {
  isAuthenticated,
};
