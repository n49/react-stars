import React, { Component } from 'react'

const parentStyles = {
  overflow: 'hidden',
  position: 'relative'
}

const defaultStyles = {
  position: 'relative',
  overflow: 'hidden',
  cursor:   'pointer',
  display:  'block',
  float:    'left'
}

const getHalfStarStyles = (color) => {
  return `
    .react-stars-half-star:before {
      position: absolute;
      overflow: hidden;
      display: block;
      z-index: 1;
      top: 0; left: 0;
      width: 50%;
      content: attr(data-forhalf);
      color: ${color};
  }`
}

class ReactStars extends Component {

  constructor(props) {

    super(props)

    this.state = {
      value: props.value || 0,
      stars: [],
      halfStar: props.half ? {
        at: props.value,
        hidden: true
      } : null
    }

    this.state.config = {
      count:  props.starCount || 5,
      size:   props.size || 15,
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
      this.state.config.half = false
    } else {
      this.state.config.half = props.half
    }

  }

  componentDidMount() {
    this.setState({
      stars: this.getStars(this.state.value)
    })
  }

  isDecimal(value) {
    return value % 1 !== 0
  }

  getRate() {
    let stars
    if(this.state.config.half) {
      stars = Math.floor(this.state.value)
    } else {
      stars = Math.round(this.state.value)
    }
    return stars
  }

  getStars(activeCount) {
    if(typeof activeCount === 'undefined') {
      activeCount = this.getRate()
    }
    let stars = []
    for(let i = 0; i < this.state.config.count; i++) {
      stars.push({
        active: i <= activeCount - 1
      })
    }
    return stars
  }

  mouseOver(event) {
    let { config, halfStar } = this.state
    if(!config.edit) return;
    let index = Number(event.target.getAttribute('data-index'))
    if(config.half) {
      const isAtHalf = this.moreThanHalf(event, config.size)
      halfStar.hidden = isAtHalf
      if(isAtHalf) index = index + 1
      halfStar.at = index
    }
    this.setState({
      stars: this.getStars(index)
    })
  }

  moreThanHalf(event, size) {
    let { target } = event
    let mouseAt = event.pageX - target.offsetLeft - target.parentNode.offsetLeft
    return mouseAt > size / 2
  }

  mouseLeave() {
    const { value, halfStar, config } = this.state
    if(!config.edit) return
    if(config.half) {
      halfStar.hidden = !this.isDecimal(value)
      halfStar.at = Math.floor(this.state.value)
    }
    this.setState({
      stars: this.getStars()
    })
  }

  clicked(event) {
    const { config, halfStar } = this.state
    if(!config.edit) return
    let index = Number(event.target.getAttribute('data-index'))
    let value
    if(config.half) {
      const isAtHalf = this.moreThanHalf(event, config.size)
      halfStar.hidden = isAtHalf
      if(isAtHalf) {
        index = index + 1
        value = index
      } else {
        value = index + 0.5
      }
      halfStar.at = index
    } else {
      value = value + 1
    }
    this.setState({
      value: value,
      stars: this.getStars(index)
    })
    this.props.onChange(value)
  }

  renderHalfStarStyleElement() {
    return (
      <style dangerouslySetInnerHTML={{
        __html: getHalfStarStyles(this.state.config.color2)
      }}></style>
    )
  }

  renderStars() {
    const { halfStar, stars } = this.state
    const { color1, color2, size, char, half } = this.state.config
    return stars.map((star, i) => {
      let starClass = ''
      if(half && !halfStar.hidden && halfStar.at === i) {
        starClass = 'react-stars-half-star'
      }
      const style = Object.assign({}, defaultStyles, {
        color:    star.active ? color2 : color1,
        fontSize: `${size}px`
      })
      return (
        <span
          className={starClass}
          style={style}
          key={i}
          data-index={i}
          data-forhalf={char}
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
        {this.state.config.half ?
        this.renderHalfStarStyleElement() : ''}
        {this.renderStars()}
      </div>
    )
  }

}

export default ReactStars
