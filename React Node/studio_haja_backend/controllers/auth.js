// const jwt = require('jsonwebtoken')

// module.exports = function (req, res, next) {
// //   const token = req.header('Authorization')
//   const token = req.headers['x-access-token'] || req.headers['authorization']

//   if (!token) {
//     return res.status(401).send('Access denied. No JWT provided.')
//   }

//   try {
//     const decoded = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
//     res.set('Authorization', token)
//     req.user = decoded

//     next()
//   } catch (ex) {
//     res.status(400).send('Invalid JWT.')
//   }
// }

const jwt = require('jsonwebtoken')

const { JWT_SECRET } = 'RANDOM_TOKEN_SECRET'

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorizaton denied' })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET)
    // Add user from payload
    req.userId = decoded.id
    next()
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' })
  }
}
