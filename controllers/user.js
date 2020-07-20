const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/User')
const Message = require('../models/message')

const HttpError = require('../models/http-error')
const fs = require('fs')
const message = require('../models/message')

// S'INSCRIRE
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) // on appel la fonction de hashage et demander de "saler" 10 fois, plus c'est long plus c'est securisé.
    .then(hash => { // bloc then = creation  d'un utilisateur ou error
      const user = new User({
        email: req.body.email,
        password: hash,
        username: req.body.username,
        messages: []
      })
      user.save() // sauvegarde en base de donnée.
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

// SE CONNECTER
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // on prends l'email dans le corps.
    .then(user => {
      if (!user) { // si on ne trouve pas le mail = error.
        return res.status(401).json({ error: 'Utilisateur non trouvé !' })
      }
      bcrypt.compare(req.body.password, user.password) // si on trouve le mail on verifie le password. bcrypt.compare va comparer le hash tapé et le hash de la bdd.
        .then(valid => {
          if (!valid) { // si password incorrect = error
            return res.status(401).json({ error: 'Mot de passe incorrect !' })
          }
          res.status(200).json({ // si password bon alors on renvoi un id et un token.
            userId: user._id,
            token: jwt.sign( // encoder nouveau token.
              { userId: user._id }, // etre sur qu'il correspond  bien au bon id.
              'RANDOM_TOKEN_SECRET', // à remplacer par une chaine de carac bcp plus longue.
              { expiresIn: '24h' } // durée de validité de 24h.
            ),
            username: user.username,
            email: user.email,
            messages: user.messages
          })
        })
        .catch(error => res.status(500).json({ error })) // si password incorrect.
    })
    .catch(error => res.status(500).json({ error })) // si user incorrect.
}

// Get data users

// exports.data = async (req, res) => {
//   const user = await User.findById(req.user.id).select('-password')
//   if (!user) throw Error('User Does not exist')
//   res.json(user)
//     .catch(e => res.status(400).json({ msg: e.message }))
// }
exports.getAll = (req, res) => {
  res.status(200).send('User Content.')
}

// SendMessage

exports.sendMessage = async (req, res, next) => {
  const CreatedMessage = new Message({
    title: req.body.title,
    message: req.body.message,
    username: req.body.username,
    author: req.body.author
  })

  let user
  try {
    user = await User.findById(req.body.author)
  } catch (err) {
    const error = new HttpError(
      'Creating message failed, please try again.',
      500
    )
    return next(error)
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404)
    return next(error)
  }

  console.log(user)

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await CreatedMessage.save({ session: sess })
    user.messages.push(CreatedMessage)
    await user.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    const error = new HttpError(
      'Creating message failed, please try again. 2',
      500
    )
    return next(error)
  }

  res.status(201).json({ message: CreatedMessage })
}

// Delete Message

exports.deleteMessage = async (req, res, next) => {
  const messageId = req.params.mid

  let message
  try {
    message = await Message.findById(messageId).populate('author')
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete message.',
      500
    )
    return next(error)
  }

  if (!message) {
    const error = new HttpError('Could not find message for this id.', 404)
    return next(error)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await message.remove({ session: sess })
    message.author.messages.pull(message)
    await message.author.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete message. 2',
      500
    )
    return next(error)
  }

  res.status(200).json({ message: 'Deleted message.' })
}

// Get messages by ID

exports.getMessagesByUserId = async (req, res, next) => {
  const userId = req.params.uid

  let userWithMessages
  try {
    userWithMessages = await User.findById(userId).populate('messages')
  } catch (err) {
    const error = new HttpError(
      'Fetching messages failed, please try again later.',
      500
    )
    return next(error)
  }

  // if (!messages || messages.length === 0) {
  if (!userWithMessages || userWithMessages.messages.length === 0) {
    return next(
      new HttpError('Could not find messages for the provided user id.', 404)
    )
  }

  res.json({
    messages: userWithMessages.messages.map(message =>
      message.toObject({ getters: true })
    )
  })
}

// GET ALL MESSAGES

exports.getAllMessages = async (req, res, next) => {
  let messages
  try {
    messages = await Message.find()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a message.',
      500
    )
    return next(error)
  }

  if (!messages) {
    const error = new HttpError(
      'Could not find messages.',
      404
    )
    return next(error)
  }

  res.json({ messages })
}

// GET ONE MESSAGE

exports.getOneMessage = async (req, res, next) => {
  const messageId = req.params.mid

  let message
  try {
    message = await Message.findById(messageId)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a message.',
      500
    )
    return next(error)
  }

  if (!message) {
    const error = new HttpError(
      'Could not find message for the provided id.',
      404
    )
    return next(error)
  }

  res.json({ message: message.toObject({ getters: true }) })
}

// UPDATE MESSAGE

exports.updateMessage = async (req, res, next) => {
  const messageId = req.params.mid

  let messageUpdate
  try {
    messageUpdate = await Message.findById(messageId)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update message. 1',
      500
    )
    return next(error)
  }

  messageUpdate.title = req.body.title
  messageUpdate.message = req.body.message

  try {
    await messageUpdate.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update message. 2',
      500
    )
    return next(error)
  }

  res.status(200).json({ messages: messageUpdate.toObject({ getters: true }) })
}
