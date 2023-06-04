const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const User = require('./models/User')
const cookieParser = require('cookie-parser')
const app = express()

const salt = bcrypt.genSaltSync(10)
const secret = 'daskm321rfdss4'

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(cookieParser())

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
  const passOk = bcrypt.compareSync(password, userDoc?.password)
  if (passOk) {
    jwt?.sign(
      { email, id: userDoc._id, username: userDoc.username },
      secret,
      {},
      (err, token) => {
        if (err) throw err
        res
          .cookie('token', token)
          .json({ id: userDoc._id, username: userDoc.username })
      }
    )
  } else {
    res.status(400).json('Email or Password are incorrect!!')
  }
})

app.get('/profile', async (req, res) => {
  const { token } = req.cookies
  if (token !== null) {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err
      res.json(info)
    })
  }
})

app.post('/logout', async (req, res) => {
  res.cookie('token', '').json('ok')
})
app.listen(4000)
