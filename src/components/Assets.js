import { h } from 'preact'

import x from '../assets/img/x.png'
import step from '../assets/img/step.png'
import circle from '../assets/img/circle.png'
import fcircle from '../assets/img/fcircle.png'
import rect from '../assets/img/rect.png'
import frect from '../assets/img/frect.png'
import dstrips from '../assets/img/dstrips.png'
import hstrips from '../assets/img/hstrips.png'
import vstrips from '../assets/img/vstrips.png'
import dots from '../assets/img/dots.png'
import waves from '../assets/img/waves.png'

const Assets = () => {
  return (
    <a-assets>
      <img crossOrigin id="x" src={x} />
      <img crossOrigin id="step" src={step} />
      <img crossOrigin id="circle" src={circle} />
      <img crossOrigin id="fcircle" src={fcircle} />
      <img crossOrigin id="rect" src={rect} />
      <img crossOrigin id="frect" src={frect} />
      <img crossOrigin id="dstrips" src={dstrips} />
      <img crossOrigin id="hstrips" src={hstrips} />
      <img crossOrigin id="vstrips" src={vstrips} />
      <img crossOrigin id="dots" src={dots} />
      <img crossOrigin id="waves" src={waves} />
    </a-assets>
  )
}

export default Assets
