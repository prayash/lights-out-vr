import { h, render } from 'preact'
import App from './components/App'
import Repo from './repo'

const repo = new Repo()

document.addEventListener('DOMContentLoaded', () => {
  render(<App repo={repo} />, document.querySelector('#app'))
})
