import 'aframe'
import 'aframe-template-component'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'aframe-event-set-component'
import { h, Component } from 'preact'
import { Entity } from 'aframe-react'
import { Presenter } from 'microcosm-preact'
import { flick } from '../actions/game'
import config from '../config.js'

import Assets from './Assets'
import MainScene from './MainScene'
import Moves from './Moves'
import Particles from './Particles'
import Sky from './Sky'
import Timer from './Timer'

export default class Game extends Presenter {
  constructor(props) {
    super(props)
  }

  getModel() {
    return {
      lights: state => state.game.lights,
      moves: state => state.game.moves,
      textures: state => state.game.textures,
      timeElapsed: state => state.game.timeElapsed
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
    const { lights, moves, textures, timeElapsed } = model

    return (
      <MainScene>
        <Assets />

        <Sky
          topColor="17 17 25"
          bottomColor="24 17 17"
          exponent="1.2"
          offset="300"
        />

        <Particles />

        <Entity primitive="a-light" type="ambient" color="#445451" />
        <Entity
          primitive="a-light"
          type="point"
          intensity="2"
          position="2 4 4"
        />

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
            />
          )
        )}

        <Moves val={moves.toString()} />
        <Timer time={new Date().now} />

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
      </MainScene>
    )
  }
}
