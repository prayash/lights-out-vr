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

export default class App extends Presenter {
  constructor(props) {
    super(props)
    this.state = { color: 'white' }
  }

  getModel() {
    return {
      game: state => state.game
    }
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue']

    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    })
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

  render() {
    console.log(this.model)
    // const { game } = model
    // const { lights } = game

    return (
      <Scene stats>
        <a-assets>
          <img crossOrigin id="x" src="img/x.png" />
          <img crossOrigin id="step" src="img/step.png" />
          <img crossOrigin id="circle" src="img/circle.png" />
          <img crossOrigin id="fcircle" src="img/fcircle.png" />
          <img crossOrigin id="rect" src="img/rect.png" />
          <img crossOrigin id="frect" src="img/frect.png" />
          <img crossOrigin id="dstrips" src="img/dstrips.png" />
          <img crossOrigin id="hstrips" src="img/hstrips.png" />
          <img crossOrigin id="vstrips" src="img/vstrips.png" />
          <img crossOrigin id="dots" src="img/dots.png" />
          <img crossOrigin id="waves" src="img/waves.png" />
        </a-assets>

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

        {lights.map((row, y) =>
          row.map((col, x) =>
            <Entity
              x={x}
              y={y}
              className="light"
              primitive="a-plane"
              height="1"
              width="1"
              src={`#${config.TEXTURES[(y + x) % 11]}`}
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
              animation__scale="property: scale; dir: alternate; dur: 200;
                easing: easeInSine; loop: true; to: 1.2 1 1.2"
            />
          )
        )}

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
