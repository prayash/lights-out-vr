import { startTimer, pauseTimer, tickTimer } from '../actions/game'

class TimerEffect {
  setup() {
    this.interval = null
  }

  register() {
    return {
      [startTimer]: this.startTimer,
      [pauseTimer]: this.pauseTimer
    }
  }

  startTimer(repo) {
    this.interval = setInterval(() => {
      repo.push(tickTimer)
    }, 1000)
  }

  pauseTimer(repo) {
    clearInterval(this.interval)
  }
}

export default TimerEffect
