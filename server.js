// const http = require('http')
// const app = require('./app')
// const express = require('express')

// const normalizePort = val => {
//   const port = parseInt(val, 10)

//   if (isNaN(port)) {
//     return val
//   }
//   if (port >= 0) {
//     return port
//   }
//   return false
// }

// const port = normalizePort(process.env.PORT || '3001')
// app.set('port', port)

// const errorHandler = error => {
//   if (error.syscall !== 'listen') {
//     throw error
//   }
//   const address = server.address()
//   const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges.')
//       process.exit(1)
//       break
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use.')
//       process.exit(1)
//       break
//     default:
//       throw error
//   }
// }

// const server = http.createServer(app)

// server.on('error', errorHandler)
// server.on('listening', () => {
//   const address = server.address()
//   const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
//   console.log('Listening on ' + bind)
// })

// server.listen(port)

const express = require('express')
const bodyParser = require('body-parser') // transforme le corps de la requete en format JSON pour les exploiter plus facilement.
const mongoose = require('mongoose')
const path = require('path') // acceder au chemin pour multer post
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

// PORT
const PORT = process.env.PORT || 3001

// Noddemailer
const nodemailer = require('nodemailer')

// Routes
const userRoutes = require('./routes/user')

// connexion à MongoDB via mongoose avec id et password
mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-ybnth.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
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
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, './studio_haja/build')))

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/images', express.static(path.join(__dirname, 'images')))
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/studio_haja/build/index.html'))
})

// app.use(express.static(path.join(__dirname, 'studio_haja/build')))
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'studio_haja', 'build', 'index.html'))
// })

// module.exports = app

app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})
