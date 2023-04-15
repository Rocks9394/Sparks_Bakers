const express = require('express');
const router = express.Router();

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
        res.send('pass');
    }
});

module.exports = router;