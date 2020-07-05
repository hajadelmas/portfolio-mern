import React, { Component } from 'react'
import axios from 'axios'
import { TextInput, Button } from 'react-materialize'

export default class Admin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      username: '',
      registrationErrors: ''
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
    const { email, password, username } = this.state

    axios
      .post('http://localhost:3001/user/signup',
        {
          // user: {
          email: email,
          password: password,
          username: username
          // }
        },
        { credentials: 'include' }
      )
      .then(response => {
        console.log('registration res', response)
      })
      .catch(error => {
        console.log('registration error', error)
      })
    // event.preventDefault()
  }

  render () {
    return (
      <div>
        <div className='adminTitle'>
          <h1>Administration</h1>
          <h3>Enregistrer un client</h3>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className='adminForm'>
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

            <TextInput
              label='Nom utilisateur'
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              required
            />

            <Button type='submit'>Enregistrer le client</Button>
          </div>
        </form>
      </div>
    )
  }
}
