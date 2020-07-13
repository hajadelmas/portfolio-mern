import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, TextInput } from 'react-materialize'
import AdminEditMessage from './AdminEditMessage'

class EditMessages extends Component {
  constructor (props) {
    super(props)

    this.state = {
      messageId: this.props.match.params.idMessage,
      getOne: [],
      title: '',
      message: ''
    }

    // this.handleSend = this.handleSend.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    const fetchMessages = () => {
      try {
        // const messageId = this.props.match.params.idMessage
        console.log(this.state.messageId)
        const responseData = axios.get(
          `http://localhost:3001/user/message/getone/${this.state.messageId}`)
        // .then(res =>  console.log(res.data) )
          .then(res => {
            this.setState({
              getOne: [res.data.message],
              title: [res.data.message.title],
              message: [res.data.message.message]
            })
            console.log(this.state.getOne)
          })
      } catch (err) {}
    }
    fetchMessages()
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleUpdate = (e) => {
    e.preventDefault()

    const { title, message } = this.state

    axios.put(`http://localhost:3001/user/message/update/${this.state.messageId}`,
      {
        title: title,
        message: message
      }
      

    )
      .then(res => {
        console.log(res.data)
        window.location = '/admin'
      })
      .catch(error => { console.log(error) })
  }

  handleDelete = () => {
    // const deleteId = this.props.match.params.idMessage
    // console.log(this.state.messageId)

    axios.delete(`http://localhost:3001/user/message/delete/${this.state.messageId}`)
      .then(res => {
        console.log(res.data)
        window.location = '/admin'
      })
      .catch(error => { console.log(error) })
  }

  render () {
    const { title, message, getOne } = this.state
    return (
      <div className='adminEdit'>
        <div>
          <h3>Modifier / Supprimer</h3>
          <ul>
            {getOne.map((message, key) => (
              <AdminEditMessage key={key} id={message._id} title={message.title} message={message.message} username={message.author} />
            ))}
          </ul>
          <Button
            className='modal-trigger buttonEdit'
            href='#modal1'
            node='button'
          >
            Modifier
          </Button>
          <Modal
            actions={[
              <Button flat modal='close' node='button' waves='green'>Close</Button>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header='Modifier le message'
            id='modal1'
            open={false}
            options={{
              dismissible: true,
              endingTop: '10%',
              inDuration: 250,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              opacity: 0.5,
              outDuration: 250,
              preventScrolling: true,
              startingTop: '4%'
            }}
            // root={[object HTMLBodyElement]}
          >
            <form onSubmit={this.handleUpdate} className='createMessageForm'>
              <TextInput
                type='text'
                name='title'
                value={String(title)}
                onChange={this.handleChange}
                required
              />

              <TextInput
                type='text'
                name='message'
                value={String(message)}
                onChange={this.handleChange}
                required
              />

              <Button type='submit'>Envoyer</Button>
            </form>
          </Modal>
          <Button
            onClick={this.handleDelete}
            className='buttonEdit'
            tooltip='Etes-vous sûr?'
            tooltipOptions={{
              position: 'right'
            }}
          >Supprimer
          </Button>
        </div>
      </div>
    )
  }
}

export default EditMessages
