import React, { Component } from 'react'
import { TextInput, Button, Textarea} from 'react-materialize'
import API from '../utils/API'
import axios from 'axios'
import Messages from './Messages'

import logoSVGBlanc from '../assets/logo_studio_SVG_blanc.svg'




class Dashboard extends Component {

  constructor (props) {
    super(props)

    this.state = {
      currentUser: API.getCurrentUser(),
      usersMessages : [],
      title: '',
      message: ''
    }

    this.handleSend = this.handleSend.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  disconnect = () => {
    API.logout()
    window.location = "/";
  }

  componentDidMount () {
    // GET INFOS FROM TOKEN
    axios.get(`http://localhost:3001/user/message/user/${this.state.currentUser.userId}`, { headers: API.authHeader() })
      .then(res => { console.log(res) })
      
      .then((messages => {
        // const allMessages = userWithMessages.messages
        this.setState({ usersMessages: messages })
        console.log(messages)

      }))
      
      .catch(err => { console.log(err) })
      
    
  }

  // POST MESSAGE WITH THE GOOD ID OF CURRENT USER CONNECTED BY TOKEN ?
  handleSend (e) {
     e.preventDefault()

    const { title, message } = this.state
    const UserId = API.getCurrentUser().userId
    const UserName = API.getCurrentUser().username

    axios
      .post(
        'http://localhost:3001/user/message',
        {
            title: title,
            message: message,
            author: UserId,
            username: UserName
        },
        { credentials: 'include' }
      )
      .then(response => {
        console.log('message send', response)
      })
      .catch(error => {
        console.log('message send error', error)
      })
  }
  

  render () {

    const { currentUser, usersMessages } = this.state

    

    return (
      <div>

        <div className='backBlue'/>
        <img src={logoSVGBlanc} className='logo1' alt='' />
        
        <div className='dashboard'>
            <div className='userSpace'>
              <div className='helloUser'><span>Bonjour, </span>{ currentUser.username }.</div>
              <Button onClick={ this.disconnect } className='disconnectButton'> Se deconnecter </Button>
            </div>
            
            <h1>Votre espace</h1>
            <h3>Ecrire un message</h3>
            <div>
              <form onSubmit={this.handleSend} className='createMessageForm'>
              <TextInput
                label='titre'
                type='text'
                name='title'
                value={this.state.title}
                onChange={this.handleChange}
                required
              />

              <TextInput
                label='message'
                type='text'
                name='message'
                value={this.state.message}
                onChange={this.handleChange}
                required
              />

              {/* <Textarea
              data-length={300}
              id=""
              label="Ecrire ici ..."
              onChange={this.handleChange}
              name='message'
              value={this.state.message}
              /> */}

              <Button type='submit'>Envoyer</Button>
            </form>
            </div>

            <h3>Messages envoyés</h3>

            {/* <ul>
            {usersMessages.map(message => (
              <Messages key={message.id} id={message.id} title={message.title}>{message.message}</Messages>
            ))}
            </ul> */}
            
        </div>
      </div>
    )
  }
}

export default Dashboard
