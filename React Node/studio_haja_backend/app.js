const express = require('express')
const bodyParser = require('body-parser') // transforme le corps de la requete en format JSON pour les exploiter plus facilement.
const mongoose = require('mongoose')
const path = require('path') // acceder au chemin pour multer post
const cors = require('cors')

const nodemailer = require('nodemailer')

const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')

// connexion à MongoDB via mongoose avec id et password
mongoose.connect('mongodb+srv://loic_delmas_33:Teahupo97421@cluster0-ybnth.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

// // pour EVITER l'erreur CORS qui empeche de relier differents serveurs, les 3000 et 4200 ici.
// // "app.use" => sur toutes les routes de l'application.
// app.use((req, res, next) => {
//   // d'accéder à notre API depuis n'importe quelle origine
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
//   // d'envoyer des requêtes avec les méthodes mentionnées
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
//   next()
// })

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/stuff', stuffRoutes)
app.use('/user', userRoutes)

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err)
    })
  }
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred!' })
})

// Send Mail

app.post('/api/form', (req, res) => {
  const htmlEmail = `
      <h3>Contact Details</3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>@mail: ${req.body.email}</li>
      </ul>
      <h3>Contact Details</3>
      <p>${req.body.message}</p>
    `

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'studio.haja.bdx@gmail.com',
      pass: 'Teahupo97421'
    }
  })

  const mailOptions = {
    from: 'studio.haja.bdx@gmail.com',
    to: 'loic.developpeur.bdx@gmail.com',
    subject: 'Message Studio Haja',
    text: htmlEmail
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log('Error')
    }
    return console.log('Email envoyé!!!')
  })
})

module.exports = app
