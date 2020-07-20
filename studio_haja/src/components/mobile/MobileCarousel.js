import React, { Component } from 'react'
import Slider from 'infinite-react-carousel'
import { ExternalLink } from 'react-external-link'

// IMG
import siteBen from '../../assets/siteBen.png'
import siteTest from '../../assets/imgsite4.png'

class MobileCarousel extends Component {
  render () {
    return (
      <div>
        <Slider className='MobileslideSkills' slidesPerRow='1' autoplay={false} centerMode arrows>
          <ExternalLink href='http://www.benm-art.com' className='MobileCarouselText' style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={siteBen} alt='' className='' />
            <h2>
                Site réalisé pour le graphiste Bordelais, Benjamin Martinez.
            </h2>
          </ExternalLink>

          <img src={siteTest} alt='' className='' />

        </Slider>
      </div>
    )
  }
}

export default MobileCarousel
