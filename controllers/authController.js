const bcrypt = require("bcrypt");

const User = require("../models/User");

exports.showRegister = (req, res) => {
    res.render("auth/register", {
        title: "Register"
    });
};

exports.showLogin = (req, res) => {
    res.render("auth/login", {
        title: "Login"
    });
};

exports.registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            req.flash("error", "Email already exists");
            return res.redirect("/auth/register");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        req.flash("success", "Registration successful");

        res.redirect("/auth/login");

    } catch (error) {

        console.log(error);

        req.flash("error", "Something went wrong");

        res.redirect("/auth/register");
    }
};

exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            req.flash("error", "Invalid credentials");
            return res.redirect("/auth/login");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            req.flash("error", "Invalid credentials");
            return res.redirect("/auth/login");
        }

        req.session.user = {
            id: user._id,
            name: user.name,
            role: user.role
        };

        req.flash("success", "Logged in successfully");

        if (user.role === "admin") {
            return res.redirect("/events");
        }

        res.redirect("/");

    } catch (error) {

        console.log(error);

        req.flash("error", "Login failed");

        res.redirect("/auth/login");
    }
};

exports.logoutUser = (req, res) => {

    req.session.destroy(() => {
        res.redirect("/");
    });
};