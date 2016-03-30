import React, { Component } from 'react'

class ReactStars extends Component {

  constructor(props) {

    super(props)

    this.state = {
      value: props.value || 0
    }

    this.state.config = {
      count:  props.starCount || 5,
      size:   props.size || 24,
      char:   props.char || '★',
      edit:   props.edit,
      half:   props.half,
      // default color of inactive star
      color1: props.color1 || 'gray',
      // color of an active star
      color2: props.color2 || '#ffd700',
      // color color of a hovered star
      color3: props.color3 || color2 || 'orange'
    }

  }

  componentWillMount() {
    this.state.stars = []
  }

  componentDidMount() {
    this.setState({
      stars: this.getArrayOfStars()
    })
  }

  /** Returns an array of stars with their properties */
  getArrayOfStars() {
    let stars = []
    for(let i = 0; i < this.state.config.count; i++) {
      stars.push({
        active: i <= this.state.value
      })
    }
    return stars
  }

  renderStars() {
    const { color1, color2, size, char } = this.state.config
    return this.state.stars.map((star, i) => {
      const style = {
        color: star.active ? color2 : color1,
        fontSize: `${size}px`
      }
      return (
        <span style={style} key={i}>
          {char}
        </span>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderStars()}
      </div>
    )
  }

}

export default ReactStars
