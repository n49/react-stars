import React, { Component } from 'react'

const parentStyles = {
  overflow: 'hidden',
  position: 'relative'
}

const defaultStyles = {
  cursor: 'pointer',
  display: 'block',
  float: 'left'
}

class ReactStars extends Component {

  constructor(props) {

    super(props)

    this.state = {
      value: props.value || 0,
      stars: [],
      halfStar: props.half ? {
        x: 0,
        there: false,
        wasOn: 0
      } : null
    }

    this.state.config = {
      count:  props.starCount || 5,
      size:   props.size || 24,
      char:   props.char || '★',
      // default color of inactive star
      color1: props.color1 || 'gray',
      // color of an active star
      color2: props.color2 || '#ffd700'
    }

    // validation of props that are true / false

    if(typeof props.edit === 'undefined') {
      this.state.config.edit = true
    } else {
      this.state.config.edit = props.edit
    }

    if(typeof props.half === 'undefined') {
      this.state.config.half = true
    } else {
      this.state.config.half = props.half
    }

  }

  componentDidMount() {
    this.setState({
      stars: this.getArrayOfStars(this.state.value)
    })
  }

  /** Returns an array of stars with their properties */
  getArrayOfStars(numberActive) {
    let stars = []
    for(let i = 0; i < this.state.config.count; i++) {
      stars.push({
        active: i <= numberActive
      })
    }
    return stars
  }

  mouseOver(event) {
    var offset = Number(event.target.getAttribute('data-key'))
    var parentOffsetLeft = event.target.parentNode.offsetLeft
    var mouseAt = event.pageX - event.target.offsetLeft - parentOffsetLeft
    if(mouseAt < this.state.config.size / 2 + 5) {
      this.state.halfStar.there = true
      this.state.halfStar.x = offset * this.state.config.size
      this.state.halfStar.wasOn = offset
    } else {
      this.state.halfStar.there = false
    }
    this.setState({
      stars: this.getArrayOfStars(offset)
    })
  }

  mouseOverHalfStar(event) {
    this.setState({
      stars: this.getArrayOfStars(this.state.halfStar.wasOn - 1)
    })
  }

  mouseLeave() {
    this.setState({
      stars: this.getArrayOfStars(this.state.value)
    })
  }

  clicked(event) {
    var offset = Number(event.target.getAttribute('data-key'))
    var x = event.pageX - event.target.offsetLeft
    this.setState({
      value: offset,
      stars: this.getArrayOfStars(offset)
    })
    const rating = offset + 1
    this.props.onRatingChange(rating)
  }

  renderHalfStar() {
    const halfStarStyle = Object.assign({
      overflow: 'hidden',
      width: `${(this.state.config.size / 2)}px`,
      fontSize: `${this.state.config.size}px`,
      position: 'absolute',
      left: `${this.state.halfStar.x}px`,
      display: this.state.halfStar.there ? 'block' : 'none',
      color: this.state.config.color2,
      cursor: 'pointer'
    })
    return (
      <span
        style={halfStarStyle}
        ref={(e) => this.state.halfStar.element = e}
        onMouseOver={this.mouseOverHalfStar.bind(this)}
        onMouseMove={this.mouseOverHalfStar.bind(this)}>
        {this.state.config.char}
      </span>
    )
  }

  renderStars() {
    const { color1, color2, size, char } = this.state.config
    return this.state.stars.map((star, i) => {
      // will be merged with default styles later
      const style = Object.assign({
        color: star.active ? color2 : color1,
        fontSize: `${size}px`
      }, defaultStyles)
      return (
        <span
          style={style}
          key={i}
          data-key={i}
          onMouseOver={this.mouseOver.bind(this)}
          onMouseMove={this.mouseOver.bind(this)}
          onMouseLeave={this.mouseLeave.bind(this)}
          onClick={this.clicked.bind(this)}>
          {char}
        </span>
      )
    })
  }

  render() {
    return (
      <div style={parentStyles}>
        {this.renderStars()}
        {this.renderHalfStar()}
      </div>
    )
  }

}

export default ReactStars
