const express = require('express')
const bodyParser = require('body-parser') // transforme le corps de la requete en format JSON pour les exploiter plus facilement.
const mongoose = require('mongoose')
const path = require('path') // acceder au chemin pour multer post
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const nodemailer = require('nodemailer')

// PORT
const PORT = process.env.PORT || 3001

// Routes
const userRoutes = require('./routes/user')

// connexion à MongoDB via mongoose avec id et password
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://loic_delmas_33:Teahupo97421@cluster0-ybnth.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

// SECURITY ----------

// Helmet
app.use(helmet())

// Rate Limiting
const limit = rateLimit({
  max: 100, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout
  message: 'Too many requests' // message to send
})
app.use('/routeName', limit) // Setting limiter on specific route

// Body Parser
app.use(express.json({ limit: '10kb' })) // Body limit is 10

// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize())

// Data Sanitization against XSS attacks
app.use(xss())

// SECURITY END ------

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'studio_haja/build')))

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/user', userRoutes)

// app.use((error, req, res, next) => {
//   if (req.file) {
//     fs.unlink(req.file.path, err => {
//       console.log(err)
//     })
//   }
//   if (res.headerSent) {
//     return next(error)
//   }
//   res.status(error.code || 500)
//   res.json({ message: error.message || 'An unknown error occurred!' })
// })

// Send Mail

app.post('/api/form', (req, res) => {
  const htmlEmail = `
      <h3>Contact Details</3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>@mail: ${req.body.email}</li>
        <li>telephone: ${req.body.tel}</li>
      </ul>
      <h3>Contact Details</3>
      <p>${req.body.message}</p>
    `

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'studio.haja.bdx@gmail.com',
      pass: 'Teahupo-97421'
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
      return console.log('Erreur avec le mail')
    }
    return console.log('Email envoyé!!!')
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/studio_haja/build/index.html'))
})

app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})
