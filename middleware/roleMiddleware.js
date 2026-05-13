exports.isAdmin = (req, res, next) => {

    if (!req.session.user || req.session.user.role !== "admin") {

        req.flash("error", "Access denied");

        return res.redirect("/");
    }

    next();
};