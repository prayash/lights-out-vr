import { h } from 'preact'
import { Scene } from 'aframe-react'

import '../lib/EffectComposer'

import '../lib/RenderPass'
import '../lib/ShaderPass'
import '../lib/DotScreenPass'
import '../lib/BloomBlendPass'

import '../lib/CopyShader'
import '../lib/ConvolutionShader'
import '../lib/DotScreenShader'
import '../lib/HorizontalBlurShader'
import '../lib/VerticalBlurShader'

const { RenderPass, ShaderPass, EffectComposer } = THREE

/**
 * Configures a THREE.EffectComposer on the current A-Frame scene.
 */
AFRAME.registerSystem('effects', {
  /**
   * Configure composer with a few arbitrary passes.
   */
  init: function() {
    const sceneEl = this.sceneEl

    if (!sceneEl.hasLoaded) {
      sceneEl.addEventListener('render-target-loaded', this.init.bind(this))
      return
    }

    const scene = sceneEl.object3D
    const renderer = sceneEl.renderer
    const camera = sceneEl.camera

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    let bloomPass = new THREE.BloomBlendPass(
      0.5, // the amount of blur
      0.75, // interpolation(0.0 ~ 1.0) original image and bloomed image
      new THREE.Vector2(2048, 2048) // image resolution
    )
    bloomPass.renderToScreen = true
    composer.addPass(bloomPass)

    this.composer = composer
    this.t = 0
    this.dt = 0

    this.bind()
  },

  /**
   * Record the timestamp for the current frame.
   * @param {number} t
   * @param {number} dt
   */
  tick: function(t, dt) {
    this.t = t
    this.dt = dt
  },

  /**
   * Binds the EffectComposer to the A-Frame render loop.
   * (This is the hacky bit.)
   */
  bind: function() {
    const renderer = this.sceneEl.renderer
    const render = renderer.render
    const system = this
    let isDigest = false

    renderer.render = function() {
      if (isDigest) {
        render.apply(this, arguments)
      } else {
        isDigest = true
        system.composer.render(system.dt)
        isDigest = false
      }
    }
  }
})

const MainScene = ({ children }) => {
  return (
    <Scene effects antialias="false">
      {children}
    </Scene>
  )
}

export default MainScene
