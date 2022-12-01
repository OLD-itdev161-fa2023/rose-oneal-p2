const express = require('express');
const router = express.Router();
const bcrypt = require('');

//user model
const User = require('../models/User');

//login page
router.get('/login', (req, res) => res.render('Login'));

//register page
router.get('/register', (req, res) => res.render('Register'));

//register handle
router.post('/register', (req, res) => {
    const { name, email, password, password2} = req.body;
    let errors = [];

    //check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    //check if passwords match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //check if password is 6 characters long
    if(password.length < 6) {
        errors.push({ msg: 'Passwords must be at least 6 characters long' });
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email, 
            password,
            password2
        });
    } else {
        //validation passed
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                   //user exsists
                   errors.push({msg: 'Email is already registered' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    }); 
                } else {

                }
            });
    }
});

module.exports = router;