import { h } from 'preact'
import { Entity } from 'aframe-react'
import tinytime from 'tinytime'

const template = tinytime('{mm}:{ss}')

const Timer = ({ time }) => {
  const date = new Date()
  date.setHours(0, 2, 36)

  return (
    <Entity
      text={{ value: template.render(date), width: 24 }}
      position={{ x: 22, y: 0.5, z: -4 }}
    />
  )
}

export default Timer
