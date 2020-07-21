const jwt = require('jsonwebtoken')

// const { JWT_SECRET } = 'RANDOM_TOKEN_SECRET'

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorizaton denied' })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    // Add user from payload
    req.userId = decoded.id
    next()
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' })
  }
}
