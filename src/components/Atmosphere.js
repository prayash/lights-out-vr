import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'

const Atmosphere = () => {
  return (
    <Entity primitive="a-light" type="ambient" color="#445451" />
    <Entity
      primitive="a-light"
      type="point"
      intensity="2"
      position="2 4 4"
    />
    <Entity primitive="a-sky" color="#111" width="2048" position="0 0 0" />
    <Entity
      particle-system={{ preset: 'dust', particleCount: 200, opacity: 0.5 }}
    />
  )
}

export default Atmosphere