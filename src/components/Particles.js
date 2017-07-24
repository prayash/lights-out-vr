import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'

const Particles = () => {
  return (
    <Entity
      particle-system={{ preset: 'dust', particleCount: 200, opacity: 0.5 }}
    />
  )
}

export default Particles
