import React, { Component } from 'react'
import IMG_2235 from '../assets/IMG_2235.png'
import Carousel from './Carousel'

class Apropos extends Component {
  render () {
    return (
      <>
        <div className='sentenceApropos'>
          <p><span>&lt;</span> A propos <span>/&gt;</span></p>
        </div>

        <div className='apropos_zone'>

          <div className='apropos_zoneText'>
            <h2><span>&lt;</span> Entrepreneur & Créatif <span>/&gt;</span></h2>
            <p>C’est d’abord dans la communication et la création d’une première agence à 22 ans que j’ai établis mon premier contact avec la création de site internet.</p>
            <p>Peu d’années plus tard, c’est en tant que développeur/ concepteur que je souhaites partager cette passion.</p>
            <h2><span>&lt;</span> Compétences <span>/&gt;</span></h2>

            <div className="">
              <Carousel />
            </div>

          </div>

          <div className='imageMoi'>
            <img src={IMG_2235} alt='' />
          </div>

        </div>
      </>
    )
  }
}

export default Apropos
