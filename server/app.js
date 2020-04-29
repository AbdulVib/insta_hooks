const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

//get models
const Users = require('./modals/userSschema')

// app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//routes
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

//db
mongoose.connect('mongodb+srv://abdul:sayed4747@cluster0-4mu3w.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('connected'))
    .catch(err => console.log(err))
  
// app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    
//middle
const customMiddleware = (req, res, next) => {
    console.log('My custome')
    next()
}



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('running 5000')
})