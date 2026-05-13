const express        = require('express');
const mongoose       = require('mongoose');
const session        = require('express-session');
const flash          = require('connect-flash');
const methodOverride = require('method-override');
const path           = require('path');
require('dotenv').config();

const app = express();

// ── Database connection ───────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  const db = mongoose.connection;

 db.on("connected", ()=>{
    console.log("mongodb connected"); 
});
db.on("err", (err)=>{
    console.log("connect error:"+err); 
});
db.on("disconnected", ()=>{
    console.log("mongodb disconnected"); 
});

process.on("SIGINT", async()=>{
  await mongoose.connection.close();
  console.log("connection closed");
  process.exit(0);
});

// ── View engine ───────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));  // parse form data
app.use(express.json());                           // parse JSON bodies
app.use(methodOverride('_method'));                // support PUT/DELETE from forms
app.use(express.static(path.join(__dirname, 'public')));  // serve static files

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }        // 24 hours
}));

app.use(flash());

// ── Global template variables ─────────────────────────────────────────────────
// Makes currentUser and flash messages available in every EJS template
app.use((req, res, next) => {
  res.locals.currentUser    = req.session.user || null;
  res.locals.successMessage = req.flash('success');
  res.locals.errorMessage   = req.flash('error');
  next();
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/',          require('./routes/indexRoutes'));
app.use('/auth',      require('./routes/authRoutes'));
app.use('/events',    require('./routes/eventRoutes'));
app.use('/bookings',  require('./routes/bookingRoutes'));
app.use('/contact',   require('./routes/contactRoutes'));

// ── 404 handler — must be last ────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// ── 500 error handler ─────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error' });
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
