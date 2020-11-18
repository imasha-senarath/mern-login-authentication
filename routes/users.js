const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

//user model
const User = require('../models/user')

//login
router.get('/login', (req,res) => res.render('login'));

//register
router.get('/register', (req,res) => res.render('register'));

//register handle
router.post('/register', (req,res) => {
    const {name, email, password, password2} = req.body;
    let errors =[];

    //check require fields
    if(!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in the all fields'});
    }

    //check password match
    if(password !== password) {
        errors.push({msg: 'Password do not match'});
    }

     //check password length
    if(password.length < 6) {
        errors.push({msg: 'Password should be atleast 6 characters'});
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
       //validation password
       User.findOne({email:email})
       .then(user =>{
           if(user) {
               //user exists
               errors.push({msg: 'Email id already registered.'});
               res.render('register', {
                errors,
                name,
                email,
                password,
                password2
            });
           } else {
                const newUser = new User ({
                    name,
                    email,
                    password
                });

                //hash password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    //if(err) throw err;
                    //set password to hashed
                    newUser.password = hash;
                    //save the user
                    newUser.save()
                    .then(user => {
                        res.redirect('/users/login')
                    })
                    .catch(err => console.log(err))
                }))
           }
       })
    }
});

module.exports = router;
