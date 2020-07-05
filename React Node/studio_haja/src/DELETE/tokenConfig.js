import API from '../utils/API'


export default {
  getThis () {
    const token = API.getToken()

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (token) {
      config.headers['x-auth-token'] = token
    }
    return config
  }
}
