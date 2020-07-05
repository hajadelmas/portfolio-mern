import decode from 'jwt-decode'

export default {

  isAuth: function () {
    return localStorage.getItem('user') !== null
  },

  authHeader: function () {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.token) {
      return { 'x-access-token': user.token }
    } else {
      return {}
    }
  },

  getCurrentUser () {
    return JSON.parse(localStorage.getItem('user'))
  },

  logout: function () {
    localStorage.clear()
  },

  loggedIn: function () {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken() // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token) // handwaiving here
  },

  getProfile () {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken())
  },

  getToken () {
    return localStorage.getItem('token')
  },

  isTokenExpired (token) {
    try {
      const decoded = decode(token)
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true
      } else { return false }
    } catch (err) {
      return false
    }
  },

  _checkStatus (response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

}
