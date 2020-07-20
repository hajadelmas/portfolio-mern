import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'


class Offres extends Component {
    state = {
        name : "React"
    }

  render () {
    return (
      <>
      
        <div className='sentenceApropos'>
          <p><span>&lt;</span> Offres <span>/&gt;</span></p>
        </div>
        <Fade>
          <div className='offresZone'>
            <h1>Avoir un site internet c’est facile, être accompagné c’est <span>mieux</span>.</h1>

            <div className='offresZone_3tools'>
              <div className='offresZone_3tools_details'>
                <i className='fas fa-users icons bounce1' />
                <p>Votre site vous correspond. L’échange des informations concernant votre projet sera l’étape la plus importante du processus de création du site.</p>
              </div>
              <div className='offresZone_3tools_details'>
                <i className='fas fa-rocket icons bounce2' />
                <p>Pendant la production du site internet, vous pourrez suivre l’avancée du projet en temps réel grâce à un espace personnel.</p>
              </div>
              <div className='offresZone_3tools_details'>
                <i className='fas fa-tools icons bounce3' />
                <p>Avoir un site c’est de l’entretien et être entrepreneur c’est avoir plein d’idées. L’accompagnement est inclus dans la prestation.</p>
              </div>
            </div>
          </div>
        </Fade>
        
        
      </>
    )
  }
}

export default Offres
