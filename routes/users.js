const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../models/User')

router.get('/login', (req, res) => res.render('login'))
router.get('/register', (req, res) => res.render('register'))

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []

  //Validation checks
  if (!name || !email || !password || !password2)
    errors.push({ message: 'Please complete all fields' })
  if (password !== password2)
    errors.push({ message: 'Passwords do not match' })
  if (password.length < 8)
    errors.push({ message: 'Password must be at least 8 characters' })

  //Either validation failed or passed at this point
  if (errors.length > 0) {
      res.render('register', {
          errors,
          name,
          email,
          password,
          password2
      })
  } 
  // At this point, validation passed. But check if the user already exists or create a new user
  else {
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                errors.push({ message: 'Email is already registered. Please log in' })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            } else {
                const newUser = new User ({ name, email, password })
                bcrypt.genSalt(10,
                    (err, salt) => bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err
                            newUser.password = hash
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are registered and able to log in')
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err))
                        }))
            }
        })
        .catch(err => console.log(err))
    }
})

//Handle Login/Logout
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard', //protected resource
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out')
    res.redirect('/users/login')
})

module.exports = router
