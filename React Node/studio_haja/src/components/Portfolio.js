import React, { Component } from 'react'
import imgsite from '../assets/imgsite4.png'
import siteBen from '../assets/siteBen.png'

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
      <>
        <div className='sentenceContact'>
          <p><span>&lt;</span> Portfolio <span>/&gt;</span></p>
        </div>

        <div className='portfolio'>
          <div className='titres'>
            <div className='titresBack'>
              <div className='hvr-forward' onMouseOver={() => this.showImage(0)}>Hello</div>
              <div className='hvr-forward' onMouseOver={() => this.showImage(1)}>Ben-Art</div>
            </div>
          </div>

          <div className='imagesTitres'>
            {showImageCount === 0 ? <img src={imgsite} alt='' /> : null}
            {showImageCount === 1 ? <img src={siteBen} alt='' /> : null}
          </div>

        </div>
      </>
    )
  }
}

export default Portfolio
