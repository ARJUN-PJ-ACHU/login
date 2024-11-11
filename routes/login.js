const express = require('express');
const router = express.Router();
var session = require('express-session');

// Sample predefined credentials
let pre_password = 'password';
let pre_email = 'user@gmail.com';
let authentication = false;

router.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
}))
// Render login page (GET request)bu
router.get('/', function (req, res) {
    if(req.session.isAuthenticated){
        res.render('home');  
    }
    else{
        res.render('index');
    }
});

// Middleware for parsing form data
router.use(express.urlencoded({ extended: false }));

// Handle login attempt (POST request)
router.post('/login', function (req, res) {
    const { email, password } = req.body;

    if (pre_email === email && pre_password === password) {
        req.session.isAuthenticated=true;  // Set authentication to true
        res.redirect('/');  // Redirect to dashboard (you can replace this with the actual page you want)
    } else {
        // Incorrect credentials, render login page with error message
        res.render('index', { error: 'Invalid email or password' });
    }
});
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Failed to log out");
        }
        res.redirect('/');  // Redirect to login page
    });
});

module.exports = router;
