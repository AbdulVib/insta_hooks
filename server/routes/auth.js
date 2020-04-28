const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const jwt_decode = require('jwt-decode')

//get models
const User = require('../modals/schema')

//get
router.get('/', (req, res) => {
  User.find({})
    .then(data => res.json(data))
    .catch(err => console.log(err, ' errr'))
})


//post
router.post('/signup', (req, res) => {
   const { name, email, password } = req.body

   if(!name || !email || !password){
      return res.status(422).json({ error: 'Please add all the fields...' })
   }

   //new object
    const newUser = new User({ name, email, password })
    //chexk email already registerd
    User.findOne({ email })
    .then(savedUser => {
      if(savedUser){
        return res.status(422).json({
          status: 'error',
          type: "email",
          msg: "email is already registered."
        })
      } 
        //hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash
            //save to db
            newUser.save()
            .then(post => res.json({
                post,
                message: 'saved succesfully'
            }))
            .catch(err => console.log(err))  .catch(err => console.log(err))
          })
        })
  })
    .catch(err => console.log(err, ' err'))

})

////////////////////////
//signin

router.post('/signin', (req, res) => {
  
  const { email, password } = req.body

  if(!email || !password){
    return res.status(422).json({
        status: 'error',
        type: "email or password",
        msg: "please add email or password."
      })
  }

  //check email already exist or not
  User.findOne({ email }).then(user => {
    if(!user){
      return res.status(422).json({
        status: 'error',
        type: "email",
        msg: "Email is not registered."
      })
    }
    //check password using bcrypt
    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch){
        //generate token using jwt
        const payload = { user }
        jwt.sign(payload, keys.secretKey, {expiresIn: 3600}, (err, token) => {
          //get user from token
          const decode = jwt_decode(token)
          res.json({
            success: true,
            token: 'Bearer ' + token,
            decode: decode
          })
        })
      }else{
        return res.status(400).json({
          status: 'error',
          type: "password",
          msg: "password is incorrect."
        })
      }
    })
    .catch(err => console.log(err, ' err'))
  })

})

//logout
// router.get('/logout', (req, res) => {
//   req.logout()
//   res.send('logout')
//   // console.log('logout')
// })


module.exports = router
