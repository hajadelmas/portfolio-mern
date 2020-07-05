import React, { Component } from 'react'

import logo_studio from '../assets/logo_studio.png'

class Header extends Component {
  render () {
    return (
      <div className='section'>
        <img src={logo_studio} class='logo1' alt='' />

        <div className='connect sweep-to-right'>
          <div>Espace client</div>
          <i className='fas fa-user-circle userLogo' />
        </div>

        <div className='menu1'>
          <ul>
            <li className='hvr-float underline-from-left' onClick={() => this.setState({ wichComponentToShow: 'Portolio' })}>Portfolio</li>
            <li className='hvr-float underline-from-left' onClick={() => this.setState({ wichComponentToShow: 'Offres' })}>Offres</li>
            <li className='hvr-float underline-from-left' onClick={() => this.setState({ wichComponentToShow: 'Apropos' })}>A propos</li>
            <li className='hvr-float underline-from-left' onClick={() => this.setState({ wichComponentToShow: 'Contact' })}>Contact</li>
          </ul>
        </div>

        <div className='displayComponent' />

      </div>
    )
  }
}

export default Header
