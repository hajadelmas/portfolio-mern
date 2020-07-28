import React, { Component } from 'react'

import Fade from 'react-reveal/Fade'
import logoMobile from '../../assets/logo_haja_mobile_solo.svg'
import MobileCarousel from './MobileCarousel'
import MobileOffres from './MobileOffres'
import IMG_2235 from '../../assets/moi.JPG'
import Carousel from '../Carousel'

import MobileContact from './Mobilecontact'



class AppMobile extends Component {
  render () {
    return (
      <div className='mobile'>

        <Fade left>

          <div className='mobile_1'>
            <img src={logoMobile} class='logo1' alt='' />
            <div className='sentenceMobile'>
              <p><span>&lt;</span> La seule <span>identitée</span> de votre site, c'est la vôtre. <span>/&gt;</span></p>

              <i className='fas fa-chevron-down mobileArrow' />
            </div>
          </div>

          <div className='mobile_2'>

            <div className='sentenceMobileTitle'>
              <p><span>&lt;</span> Portfolio <span>/&gt;</span></p>
            </div>

            <MobileCarousel />
          </div>

          <div className='mobile_3'>
            <MobileOffres />
          </div>

          <div className='mobile_4'>
            <br />
            <img src={IMG_2235} alt='' className='photoMe' />
            <div className='mobileApropos'>
              <h2><span>&lt;</span> Entrepreneur & Créatif <span>/&gt;</span></h2>
              <p>C’est d’abord dans la communication et la création d’une première agence à 22 ans que j’ai établis mon premier contact avec la création de site internet.</p>
              <p>Peu d’années plus tard, c’est en tant que développeur/ concepteur que je souhaites partager cette passion.</p>
              {/* <h2><span>&lt;</span> Compétences <span>/&gt;</span></h2> */}
            </div>
            {/* <Carousel /> */}
          </div>

          {/* <div className='mobile_5'>
            <MobileContact />
          </div> */}

        </Fade>
      </div>
    )
  }
}

export default AppMobile
