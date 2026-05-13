const express = require('express');
const router  = express.Router();

// Auth routes (Member 4 — Security) 
// GET  /auth/login     → show login form
// POST /auth/login     → handle login
// GET  /auth/register  → show register form
// POST /auth/register  → handle registration
// POST /auth/logout    → logout user

router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
