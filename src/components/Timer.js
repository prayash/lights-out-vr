import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'

const Timer = () => {
  return (
    <Entity
      text={{ value: '00:00', width: 24 }}
      position={{ x: 22, y: 0.5, z: -4 }}
    />
  )
}

export default Timer
