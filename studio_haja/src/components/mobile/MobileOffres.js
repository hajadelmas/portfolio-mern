import React, { Component } from 'react'

class MobileOffres extends Component {
  render () {
    return (
      <div>
        <div className='mobileOffre'>
          <h1>Avoir un site internet c’est facile, être accompagné c’est mieux.</h1>

          <div className='mobileOffre_container_1'>
            <div className='mobileOffre_container_2'>
              <i className='fas fa-users icons' />
              <p>Votre site vous correspond. L’échange des informations concernant votre projet sera l’étape la plus importante du processus de création du site.</p>
            </div>
            <div className='mobileOffre_container_2'>
              <i className='fas fa-rocket icons' />
              <p>Pendant la production du site internet, vous pourrez suivre l’avancée du projet en temps réel grâce à un espace personnel.</p>
            </div>
            <div className='mobileOffre_container_2'>
              <i className='fas fa-tools icons' />
              <p>Avoir un site c’est de l’entretien et être entrepreneur c’est avoir plein d’idées. L’accompagnement est inclus dans la prestation.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MobileOffres
