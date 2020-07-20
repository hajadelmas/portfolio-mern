import React, { Component } from 'react'
import imgsite from '../assets/imgsite4@2x.png'
import siteBen from '../assets/siteBen@2x.png'
import { ExternalLink } from 'react-external-link'
import Fade from 'react-reveal/Fade'



class Portfolio extends Component {
  constructor () {
    super()
    this.state = {
      name: 'React',
      showImageCount: 0
    }
    this.showImage = this.showImage.bind(this)
  }

  showImage (count) {
    this.setState({ showImageCount: count })
  }

  render () {
    const { showImageCount } = this.state

    return (
      <Fade left>
        <div className='sentenceContact'>
          <p><span>&lt;</span> Portfolio <span>/&gt;</span></p>
        </div>

        <div className='portfolio'>
          <div className='titres'>
            <div className='titresBack'>
              <div className='hvr-forward' onMouseOver={() => this.showImage(0)}>Hello</div>
              <div className='hvr-forward' onMouseOver={() => this.showImage(1)}>
                <ExternalLink href='http://www.benm-art.com' className='titreLink' style={{ textDecoration: 'none', color: 'inherit' }}>Benm-Art</ExternalLink>
              </div>
            </div>
          </div>

          <div className='imagesTitres'>
            {showImageCount === 0 ? <img src={imgsite} alt='' /> : null}
            {showImageCount === 1 ? <img src={siteBen} alt='' /> : null}
          </div>

        </div>
      </Fade>

    )
  }
}

export default Portfolio
