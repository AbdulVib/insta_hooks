const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const schema =  mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: 'no photo'
 },
  postedBy: {
    type: ObjectId,
    ref: "insta_users"
},
  date: {
    type: Date,
    default: Date.now
  }
  
})

const Post = mongoose.model('insta_posts', schema)

module.exports = Post