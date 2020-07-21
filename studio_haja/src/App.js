import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logoSVG from './assets/logo_studio_SVG.svg'
import Main from './components/Main'
import Portfolio from './components/Portfolio'
import Offres from './components/Offres'
import Contact from './components/Contact'
import Apropos from './components/Apropos'
import AppMobile from './components/mobile/AppMobile'

class App extends Component {
  constructor () {
    super()
    this.state = {
      name: 'React',
      showComponentCount: 0
    }
    this.showComponent = this.showComponent.bind(this)
  }

  showComponent (count) {
    this.setState({ showComponentCount: count })
  }

  render () {
    const { showComponentCount } = this.state

    return (
      <div>
        <div className='section'>
          <img src={logoSVG} class='logo1' alt='' onClick={() => this.showComponent(0)} />

          <div className='connect sweep-to-right'>
            <Link to='/login'>Espace client</Link>
            <i className='fas fa-user-circle userLogo' />
          </div>

          <div className='menu1'>
            <ul>
              <li className='hvr-float underline-from-left' onClick={() => this.showComponent(1)}>Portfolio</li>
              <li className='hvr-float underline-from-left' onClick={() => this.showComponent(2)}>Offres</li>
              <li className='hvr-float underline-from-left' onClick={() => this.showComponent(3)}>A propos</li>
              <li className='hvr-float underline-from-left' onClick={() => this.showComponent(4)}>Contact</li>
            </ul>
          </div>

          {showComponentCount === 0 ? <Main /> : null}
          {showComponentCount === 1 ? <Portfolio /> : null}
          {showComponentCount === 2 ? <Offres /> : null}
          {showComponentCount === 3 ? <Apropos /> : null}
          {showComponentCount === 4 ? <Contact /> : null}

        </div>

        <div className='mobile'>
          <AppMobile />
        </div>

      </div>

    )
  }
}

export default App
