import { h } from 'preact'
import { Entity } from 'aframe-react'

const Intro = ({ onClick }) => {
  return (
    <Entity
      class="clickable"
      geometry={{ primitive: 'plane', width: 3, height: 2 }}
      material={{ color: 'white', opacity: 0 }}
      position={{ x: 2, y: 2, z: -2 }}
      text={{
        value: 'START',
        align: 'center',
        anchor: 'align',
        baseline: 'center',
        width: 15,
        letterSpacing: 5
      }}
      events={{
        click: onClick
      }}
    />
  )
}

export default Intro
