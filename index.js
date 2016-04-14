import React from 'react'
import { render } from 'react-dom'
import Stars from '../src/react-stars'

const firstExample = {
  size: 30,
  value: 2.5,
  edit: false
}

const secondExample = {
  size: 50,
  count: 10,
  char: '',
  color1: '#ff9900',
  color2: '#6599ff',
  onChange: newValue => {
    console.log(`Example 2: new value is ${newValue}`)
  }
}

const thirdExample = {
  size: 40,
  count: 7,
  half: false,
  value: 4,
  onChange: newValue => {
    console.log(`Example 3: new value is ${newValue}`)
  }
}

render(
  <div>
    <h1>react-stars examples</h1>
    <p><i>Star rating component for your React projects</i></p>
    Custom size, preset value, not editable
    <Stars {...firstExample} />
    Custom character, custom colors, 10 stars
    <Stars {...secondExample} />
    Editable, preset value, half stars off
    <Stars {...thirdExample} />
    <a href="https://github.com/n49/react-stars">Github</a>&nbsp;|&nbsp;
    <a href="https://www.npmjs.com/package/react-stars">NPM package</a>
  </div>,
  document.getElementById('root')
)
