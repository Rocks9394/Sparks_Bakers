const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User Model
const User = require('../models/User');

// Login page
router.get('/login', (req, res) => res.render('login'));

//Register page
router.get('/register', (req, res) => res.render('register'));

//Register handle 
router.post('/register', (req, res) =>{
    // console.log(req.body)
    // res.send('working')
    const {name, email, password, password2 } = req.body;
    let errors = [];

    //check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }

    //check password match
    if(password!=password2){
        errors.push({msg: 'Password do not match'});
    }

    //check password lengh

    if(password.length < 8){
        errors.push({msg: 'Password sould be atleast 8 characters'});
    }

    if(errors.length>0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });

    }else{
        // Validation passed
        User.findOne({ email: email})
        .then(user =>{
            if(user){
                //User Exists
                errors.push({ msg: 'Email.is already registered'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Hash password
                bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    // set password to hash
                    newUser.password = hash;
                    //save the user
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'Thanks for registration');
                        res.redirect('./login');
                    })
                    .catch(err => console.log(err));

                }))
            }
        });


    }
});

//Login handle
router.post('./login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true

    })(req, res, next);
});

//logout handle
router.get('/logout', (req, res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/user/login');
})

module.exports = router;