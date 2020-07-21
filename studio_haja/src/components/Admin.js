import React, { Component } from 'react'
import axios from 'axios'
import { TextInput, Button } from 'react-materialize'
import API from '../utils/API'
import AdminMessages from './AdminMessages'

export default class Admin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      username: '',
      registrationErrors: '',
      allMessages: [],
      isAdmin: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount () {
    const fetchMessages = () => {
      try {
        const responseData = axios.get(
          process.env.REACT_APP_BACKEND_URL + '/message/all'
          , { headers: API.authHeader() })
          // .then(res => console.log(res.data))
          .then(res => {
            this.setState({ allMessages: res.data.messages })
          })
      } catch (err) {}
    }
    fetchMessages()
  }

  handleSubmit (event) {
    const { email, password, username } = this.state

    axios
      .post(process.env.REACT_APP_BACKEND_URL + '/signup',
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
    const { allMessages } = this.state

    if (this.state.isAdmin === 'hajadel') {
      return (

        <div className='adminGeneral'>

          <div className='adminTitle'>
            <h1>Administration</h1>
          </div>

          <div className='adminContainer'>
            <div className='adminRegister'>
              <h3>Enregistrer un client</h3>
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

            <div className='adminDisplayMessage'>
              <h3>Messages reçues</h3>
              <ul>
                {allMessages.map((message, key) => (
                  <AdminMessages key={key} id={message._id} title={message.title} message={message.message} username={message.author} />
                ))}
              </ul>
            </div>
          </div>

        </div>
      )
    } else {
      return (
        <div className='adminPass'>
          <div className='adminPass_container'>
            <h2>
              Admin, c'est toi ?
            </h2>
            <TextInput
              className='adminPass_input'
              label='ADMIN PASS'
              type='password'
              name='isAdmin'
              value={this.state.isAdmin}
              onChange={this.handleChange}
            />
          </div>


        </div>
      )
    }
  }
}
