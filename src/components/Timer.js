import { h } from 'preact'
import { Entity } from 'aframe-react'
import tinytime from 'tinytime'

const template = tinytime('{mm}:{ss}')

const Timer = ({ time }) => {
  const date = new Date()
  const seconds = time % 60
  const minutes = Math.floor(time / 60)
  date.setHours(0, minutes, seconds)

  return (
    <Entity
      text={{ value: template.render(date), width: 24 }}
      position={{ x: 22, y: 0.5, z: -4 }}
    />
  )
}

export default Timer
