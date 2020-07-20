const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true }

})

module.exports = mongoose.model('Message', messageSchema)
