import 'aframe'
import 'aframe-template-component'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'aframe-event-set-component'
import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'
import { Presenter } from 'microcosm-preact'
import { flick } from '../actions/game'
import config from '../config.js'

import Assets from './Assets'
import Atmosphere from './Atmosphere'
import Moves from './Moves'
import Timer from './Timer'

export default class Main extends Presenter {
  constructor(props) {
    super(props)
  }

  getModel() {
    return {
      lights: state => state.game.lights,
      moves: state => state.game.moves,
      textures: state => state.game.textures
    }
  }

  handleClick = e => {
    // e.target.sceneEl.object3D.rotation.set(50, 90, 180)
    // console.log(e.target.sceneEl.object3D.rotation)

    const payload = {
      x: parseInt(e.target.attributes[0].value),
      y: parseInt(e.target.attributes[1].value)
    }

    this.repo.push(flick, payload)
  }

  render(props, state, model) {
    console.log(model.moves)
    const { lights, moves, textures } = model

    return (
      <Scene>
        <Assets />

        {lights.map((row, y) =>
          row.map((col, x) =>
            <Entity
              x={x}
              y={y}
              className="light"
              primitive="a-plane"
              height="1"
              width="1"
              src={`#${textures[y][x]}`}
              material={{
                color: col === 1 ? 'white' : '#111111',
                opacity: 0.95
              }}
              position={{
                x: x * config.SCALE + config.X_OFFSET,
                y: y * config.SCALE + config.Y_OFFSET,
                z: 0
              }}
              rotation={{ x: 0, y: 0, z: 0 }}
              events={{
                click: this.handleClick
              }}
              animation__scale="property: scale; dir: alternate; dur: 5000;
                easing: easeInSine; loop: true; to: 1.1 1.1 1.1"
            />
          )
        )}

        <Moves val={moves.toString()} />
        <Timer />

        <Entity position={{ x: 2, y: 3, z: 8 }}>
          <Entity primitive="a-camera" wasd-controls-enabled={false}>
            <Entity
              primitive="a-cursor"
              fuse="true"
              event-set__1="_event: mouseenter; color: black"
              event-set__2="_event: mouseleave; color: white"
              raycaster="objects: .light"
            />
          </Entity>
        </Entity>
      </Scene>
    )
  }
}
