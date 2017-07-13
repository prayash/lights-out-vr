/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('toggle', {
  schema: {
    on: { type: 'string' },
    dur: { type: 'number', default: 300 }
  },

  init: function() {
    var data = this.data
    var el = this.el

    el.addEventListener(data.on, function() {
      this.computeNewState()
    })
  },

  /**
   * Setup fade-in + fade-out.
   */
  computeNewState: function() {
    var data = this.data
    var targetEl = this.data.target
    alert('COMPUTE NEW STATE')

    // Only set up once.
    // if (targetEl.dataset.setImageFadeSetup) {
    // return
    // }
    // targetEl.dataset.setImageFadeSetup = true

    // Create animation.
    // targetEl.setAttribute('animation__fade', {
    //   property: 'material.color',
    //   startEvents: 'set-image-fade',
    //   dir: 'alternate',
    //   dur: data.dur,
    //   from: '#FFF',
    //   to: '#000'
    // })
  }
})
