const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User model
const User = require('../models/User');
const Dash = require('../models/Dash');

//Login page
router.get('/login', (req, res) => res.render('home'));

//Register page
router.get('/register', (req, res) => res.render('home'));

//Register Handle
router.post('/register', (req, res) => {
const {name, email, password, password2, location} = req.body;
let errors = [];

//Check required fields
if(!name || !email || !password || !password2 ){
    errors.push({msg:'Please fill in all fields'});
}

//Check passwords match
if(password != password2){
    errors.push({msg:'passwords do not match'})
}

//Check pass length
if(password.length < 6){
    errors.push({msg:'password should be atleast 6 characters'});
}

if(errors.length > 0){
    res.render('home', {
        errors,
        name,
        email,
        password,
        password2,
        location
    });
} 
else {
    //Validation passed
    User.findOne({ email: email})
        .then(user => {
            if(user) {
                //User exists
                errors.push({msg: 'Email already exists'})
                res.render('home', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    location
                });
            } else{
                const newUser = new User({
                    name,
                    email,
                    password,
                    location
                });
                //Hash Password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //Set Password to hashed
                        newUser.password = hash;
                        //Save user
                        newUser.save()
                        .then(user =>{
                            req.flash('success_msg', 'you are now registered and you can log in');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                }))
            }
        });
    }
});

//Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


//Log Out Handle
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

// Get all users

/*router.get('/users', async function(){
    const users = await User.find()
    console.log(users);
})

router.get('/drivers', async function(){
    const dash = await Dash.find()
    console.log(dash);
})*/

module.exports = router;