import { h } from 'preact'
import { Entity } from 'aframe-react'

const Logo = () => {
  return (
    <Entity
      primitive="a-plane"
      height="2"
      width="8"
      src="#logo"
      material={{
        color: 'white',
        opacity: 0.95
      }}
      position={{
        x: 2,
        y: 5,
        z: 0
      }}
    />
  )
}

export default Logo
