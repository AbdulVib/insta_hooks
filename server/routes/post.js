const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')

//get models
const Post = require('../modals/postSchema')


//get
router.get('/allpost', (req, res) => {
    Post.find({})
      .populate('postedBy', "_id name email")
      .then(data => res.json({data}))
      .catch(err => console.log(err, ' errr'))
  })
  
router.post('/createpost', requireLogin, (req, res) => {
    const { title, body } = req.body

    if(!title || !body){
        return res.status(422).json({
            error: 'Please add all the fields'
        })
    }
    // console.log(req.user, ' userrrr')
    // res.send('okkkkkkk')
    req.user.password = undefined
    const newPost = new Post({ title, body, postedBy: req.user })

    newPost.save()
        .then(data => res.json({post:data}))
        .catch(err => console.log(err, ' errrr'))
})

router.get('/myposts', requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
    .populate('postedBy', "_id, name")
    .then(myPost => {
        res.json({ myPost })
    })
    .catch(err => console.log(err, ' errr'))
})

module.exports = router
