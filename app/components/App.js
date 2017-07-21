import 'aframe'
import 'aframe-template-component'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'aframe-event-set-component'
import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'
import config from '../config'

const matrix = [
  [1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1],
  [0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
  [1, 1, 0, 1, 1]
]

const textures = [
  'x',
  'step',
  'circle',
  'fcircle',
  'rect',
  'frect',
  'dstrips',
  'hstrips',
  'vstrips',
  'dots',
  'waves'
]

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { color: 'white' }
  }

  componentDidMount() {}

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue']
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  render() {
    return (
      <Scene>
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

        {matrix.map((row, rowIndex) =>
          row.map((col, colIndex) =>
            <Entity
              className="light"
              primitive="a-plane"
              height="1"
              width="1"
              src={`#${textures[Math.floor(Math.random() * textures.length)]}`}
              material={{
                color: col === 1 ? 'white' : 'gray',
                opacity: 0.95
              }}
              position={{
                x: colIndex * config.SCALE + config.X_OFFSET,
                y: rowIndex * config.SCALE + config.Y_OFFSET,
                z: 0
              }}
            >
              {/* <Entity
                primitive="a-light"
                type="point"
                intensity="0.5"
                position={{
                  x: 0,
                  y: 0,
                  z: 0
                }}
              /> */}
            </Entity>
          )
        )}

        {/* <Entity
          text={{ value: 'Hello, A-Frame Preact!', align: 'center' }}
          position={{ x: 0, y: 2, z: -1 }}
        /> */}
        {/* <Entity
          id="box"
          geometry={{ primitive: 'box' }}
          material={{ color: this.state.color, opacity: 0.6 }}
          animation__rotate={{
            property: 'rotation',
            dur: 2000,
            loop: true,
            to: '360 360 360'
          }}
          animation__scale={{
            property: 'scale',
            dir: 'alternate',
            dur: 100,
            loop: true,
            to: '1.1 1.1 1.1'
          }}
          position={{ x: 0, y: 1, z: -3 }}
          events={{ click: this.changeColor.bind(this) }}
        >
          <Entity
            animation__scale={{
              property: 'scale',
              dir: 'alternate',
              dur: 100,
              loop: true,
              to: '2 2 2'
            }}
            geometry={{ primitive: 'box', depth: 0.2, height: 0.2, width: 0.2 }}
            material={{ color: '#24CAFF' }}
          />
        </Entity> */}

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
