// Blocks unauthenticated users from accessing protected routes.
// If the user is not logged in, redirect to the login page.
module.exports = function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  req.flash('error', 'You must be logged in to access that page.');
  res.redirect('/auth/login');
};
