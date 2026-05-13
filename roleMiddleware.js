// Restricts a route to admin users only.
// Must be used AFTER authMiddleware so req.session.user is guaranteed.
module.exports = function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  req.flash('error', 'Access denied. Admins only.');
  res.redirect('/');
};
