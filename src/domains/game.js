import { flick, ready, tickTimer } from '../actions/game'
import {
  createRandomMatrix,
  createTextureMatrix,
  verifyCompletion,
  computeNewMatrix
} from '../helpers'

const Game = {
  getInitialState() {
    return {
      hasWon: false,
      textures: createTextureMatrix(5),
      lights: createRandomMatrix(5, 'EASY'),
      mode: 'EASY',
      moves: 0,
      ready: true,
      showInfo: false,
      showSettings: false,
      timeElapsed: 0
    }
  },

  register() {
    return {
      [flick]: this.compute,
      [ready]: this.gameReady,
      [tickTimer]: this.tick
    }
  },

  compute(state, payload) {
    const { y, x } = payload
    const computedMatrix = computeNewMatrix(state.lights, { y, x })

    // computedMatrix.map(x => console.info('row:', x.toString()))
    console.info('flick :: x:', x, 'y:', y)

    return {
      ...state,
      hasWon: verifyCompletion(computedMatrix),
      lights: computedMatrix,
      moves: state.moves + 1
    }
  },

  gameReady(state) {
    return {
      ...state,
      ready: true
    }
  },

  tick(state) {
    return {
      ...state,
      timeElapsed: state.timeElapsed + 1
    }
  }
}

export default Game
