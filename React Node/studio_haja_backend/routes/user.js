const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')

const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/id', auth, userCtrl.getAll)

// message

router.post('/message', userCtrl.sendMessage)
router.delete('/message/delete/:mid', userCtrl.deleteMessage)
router.get('/message/user/:uid', userCtrl.getMessagesByUserId)

module.exports = router
