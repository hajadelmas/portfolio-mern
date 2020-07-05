import React, { Component } from 'react'
import Slider from 'infinite-react-carousel'

// IMG
import slide1 from '../assets/slide1.png'
import slide2 from '../assets/slide2.png'
import slide3 from '../assets/slide3.png'
import slide4 from '../assets/slide4.png'
import slide5 from '../assets/slide5.png'
import slide6 from '../assets/slide6.png'
import slide7 from '../assets/slide7.png'
import slide8 from '../assets/slide8.png'
import slide9 from '../assets/slide9.png'
import slide10 from '../assets/slide10.png'


class Carousel extends Component {
  render () {
    return (
      <div>
        <Slider className='slideSkills' slidesPerRow='3' autoplay arrows={false}>
          <img src={slide1} alt='' className='' />
          <img src={slide2} alt='' className='' />
          <img src={slide3} alt='' className='' />
          <img src={slide4} alt='' className='' />
          <img src={slide5} alt='' className='' />
          <img src={slide6} alt='' className='' />
          <img src={slide7} alt='' className='' />
          <img src={slide8} alt='' className='' />
          <img src={slide9} alt='' className='' />
          <img src={slide10} alt='' className='' />

        </Slider>
      </div>
    )
  }
}

export default Carousel
