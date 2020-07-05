import React, { Component } from 'react'
import axios from 'axios'
import { TextInput, Button } from 'react-materialize'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loginErrors: '',
      isAuth: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    const { email, password } = this.state

    axios
      .post(
        'http://localhost:3001/user/login',
        {
          email: email,
          password: password
        },
        { credentials: 'include' }
      )
      .then(response => {
        console.log('login ok', response)
        localStorage.setItem('user', JSON.stringify(response.data))
        // localStorage.setItem('token', response.data.token)
        window.location = '/dashboard'
      })
      .catch(error => {
        console.log('login error', error)
      })
    event.preventDefault()
  }

  render () {
    return (
      <div>
        <div className='loginConnect'>

          <Link to='/' className='loginCross'><i class='fas fa-times' /></Link>

          <div className='loginTitle'>
            Votre espace pour ne plus se sentir seul(e).
          </div>

          <div className='loginForm'>
            <form onSubmit={this.handleSubmit}>
              <TextInput
                label='Email'
                type='email'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                required
              />

              <TextInput
                label='Mot de passe'
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                required
              />

              <Button type='submit'>Se connecter</Button>
            </form>
          </div>
        </div>

      </div>
    )
  }
}

export default Login
