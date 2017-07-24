import { flick, tickTimer } from '../actions/game'
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
      showInfo: false,
      showSettings: false
    }
  },

  register() {
    return {
      [flick]: this.compute,
      [tickTimer]: this.tick
    }
  },

  compute(state, payload) {
    const { x, y } = payload
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

  tick(state, payload) {}
}

export default Game
