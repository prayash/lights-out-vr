import { h } from 'preact'
import { Entity } from 'aframe-react'
import { withSend } from 'microcosm-preact'
import { ready } from '../actions/game'

const Intro = ({ send }) => {
  let onClick = () => send(ready)

  return (
    <Entity
      class="clickable"
      primitive="a-box"
      material={{ color: 'white' }}
      position={{ x: 2, y: 2, z: -2 }}
      events={{
        click: onClick
      }}
    >
      <Entity
        class="clickable"
        text={{
          value: 'START'
        }}
      />
    </Entity>
  )
}

export default withSend(Intro)
