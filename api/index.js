const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const User = require('./models/User')
const app = express()

const salt = bcrypt.genSaltSync(10)
const secret = 'daskm321rfdss4'

app.use(cors())
app.use(express.json())

mongoose.connect(
  'mongodb+srv://test:test@cluster0.2zmshmc.mongodb.net/?retryWrites=true&w=majority'
)

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    })
    res.json(userDoc)
  } catch (e) {
    res.status(400).json(e)
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const userDoc = await User.findOne({ email })
  const passOk = bcrypt.compareSync(password, userDoc.password)
  if (passOk) {
    //logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err
      res.json(token)
    })
  } else {
    res.status(400).json('Email or Password are incorrect!!')
  }
})
app.listen(4000)
