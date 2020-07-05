import React, { Component } from 'react'

class Main extends Component {
  state = {
    name : "React"
}

  render () {
    return (
      <div>
        <div className='sentence'>
          <p><span>&lt;</span> La seule <span>identitée</span> de votre site, c'est la vôtre. <span>/&gt;</span></p>
        </div>
        <div className='ocean'>
          <div className='wave' />
          <div className='wave' />

        </div>
      </div>
    )
  }
}

export default Main
