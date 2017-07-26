import { h } from 'preact'
import { Entity } from 'aframe-react'
import { Presenter } from 'microcosm-preact'
import { flick, ready, startTimer } from '../actions/game'
import config from '../config.js'

import Assets from './Assets'
import MainScene from './MainScene'
import Moves from './Moves'
import Particles from './Particles'
import Sky from './Sky'
import Timer from './Timer'

export default class Game extends Presenter {
  componentDidMount() {
    document.querySelector('a-assets').addEventListener('loaded', () => {
      // this.repo.push(ready)
    })
  }

  getModel() {
    return {
      hasWon: state => state.game.hasWon,
      lights: state => state.game.lights,
      ready: state => state.game.ready,
      moves: state => state.game.moves,
      textures: state => state.game.textures,
      timeElapsed: state => state.game.timeElapsed
    }
  }

  handleClick = e => {
    // e.target.sceneEl.object3D.rotation.set(50, 90, 180)
    // console.log(e.target.sceneEl.object3D.rotation)

    if (this.model.moves === 0) {
      this.repo.push(startTimer)
    }

    const payload = {
      x: parseInt(e.target.attributes[0].value),
      y: parseInt(e.target.attributes[1].value)
    }

    this.repo.push(flick, payload)
  }

  startGame = () => {
    this.repo.push(ready)
  }

  render(props, state, model) {
    const { hasWon, lights, moves, ready, textures, timeElapsed } = model

    if (hasWon) {
      alert('Yay.')
    }

    return (
      <MainScene>
        <Assets />

        <Sky
          topColor="17 17 25"
          bottomColor="24 17 17"
          exponent="1.5"
          offset="1500.0"
        />

        <Particles />

        <Entity
          primitive="a-light"
          type="point"
          intensity="2"
          position="2 4 4"
        />

        {ready
          ? <Entity>
              {lights.map((row, y) =>
                row.map((col, x) =>
                  <Entity
                    x={x}
                    y={y}
                    class="clickable"
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
              <Timer time={timeElapsed} />
            </Entity>
          : <Entity
              class="clickable"
              geometry={{ primitive: 'plane', width: 3, height: 2 }}
              material={{ color: 'white', opacity: 0 }}
              position={{ x: 2, y: 2, z: -2 }}
              text={{
                value: 'START',
                align: 'center',
                anchor: 'align',
                baseline: 'center',
                width: 15,
                letterSpacing: 5
              }}
              events={{
                click: this.startGame
              }}
            />}

        <Entity position={{ x: 2, y: 3, z: 10 }}>
          <Entity primitive="a-camera" wasd-controls-enabled={false}>
            <Entity
              primitive="a-cursor"
              cursor={{
                color: 'white',
                fuse: false,
                fuseTimeout: 500
              }}
              material={{
                color: 'white',
                shader: 'flat'
              }}
              event-set__1="_event: mouseenter; color: black"
              event-set__2="_event: mouseleave; color: white"
              raycaster="objects: .clickable"
            />
          </Entity>
        </Entity>
      </MainScene>
    )
  }
}
