const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({
  username: { type: String, required: true, min: 5, max: 20, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
