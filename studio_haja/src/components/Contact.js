import React, { Component } from 'react'
import axios from 'axios'

import 'materialize-css'
import { TextInput, Textarea, Button, Modal } from 'react-materialize'
import Fade from 'react-reveal/Fade'


class Contact extends Component {
  constructor() {
    super()

    this.state = {
      name:'',
      email:'',
      tel:'',
      message:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }
  

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  async handleSubmit(e) {
    e.preventDefault()

    const { name, email, tel, message } = this.state

    const form = await axios.post('/api/form', {
      name,
      email,
      tel,
      message
    })

    console.log(form)

    this.setState({ name:'', email:'', tel:'', message:'' })


  }

  handleClear(e) {
    this.setState({ name:'', email:'', tel:'', message:'' })
  }

  render () {
    return (
      <Fade left>
        <div className='sentenceContact'>
          <p><span>&lt;</span> Contact <span>/&gt;</span></p>
        </div>

        <form action='' id='clearForm' className='contact' onSubmit={this.handleSubmit}>

          

          <div className='formContact'>

            <TextInput id='TextInput-4' label='Nom & Prénom *' name='name' onChange={this.handleChange} value={this.state.name}/>
            <TextInput id='TextInput-4' label='Mail*' name='email' email validate onChange={this.handleChange} value={this.state.email}/>
            <TextInput id='TextInput-4' label='Téléphone*' name='tel' onChange={this.handleChange} value={this.state.tel}/>

          </div>

          <div className='textareaContact'>
            <label for='demande'>Votre demande*</label>

            <Textarea
              data-length={120}
              id="demande mainInput"
              label="Ecrire ici ..."
              onChange={this.handleChange}
              name='message'
              value={this.state.message}
            />

            {/* <button type='submit'>Envoyer</button> */}
            {/* <ModalThing type='submit'/> */}
            <Button
              className='modal-trigger'
              href='#modal1'
              node='button'
              onClick={this.handleSubmit}
            >
              Envoyer
            </Button>
            <Modal
              actions={[
                <Button flat modal='close' node='button' waves='green' onClick={this.handleClear}>Fermer</Button>
              ]}
              bottomSheet={false}
              fixedFooter={false}
              header='Message envoyé !'
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
            //   root={[object HTMLBodyElement]}
            >
              Votre message à bien été envoyé.
            </Modal>
          </div>


        </form>

        


        <div className='bandeRose' />
      </Fade>
    )
  }
}

export default Contact
