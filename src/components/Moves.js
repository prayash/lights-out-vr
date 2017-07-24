import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'

const Moves = ({ val }) => {
  return (
    <Entity
      text={{ value: val, width: 24 }}
      position={{ x: 4, y: 0.5, z: -4 }}
    />
  )
}

export default Moves
