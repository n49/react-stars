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

const halfStarStyles = {
  cursor: 'pointer',
  position: 'absolute',
  overflow: 'hidden'
}

class ReactStars extends Component {

  constructor(props) {

    super(props)

    console.error('Initial value is ' + props.value)

    this.state = {
      value: props.value || 0,
      stars: [],
      halfStar: props.half ? {
        at: 0,
        hidden: false
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
    if(this.state.config.half) {
      this.state.halfStar.at = this.rateBrakeDown().stars + 1
    }
    this.setState({
      stars: this.getStars()
    })
  }

  rateBrakeDown() {
    let hasHalfStar = Math.round(this.state.value % 1) === 1
    let stars = Math.floor(this.state.value) - (hasHalfStar ? 1 : 0)
    return {
      stars,
      hasHalfStar
    }
  }

  getStars(activeCount) {
    if(typeof activeCount === 'undefined') {
      activeCount = this.rateBrakeDown().stars
    }
    let stars = []
    for(let i = 0; i < this.state.config.count; i++) {
      stars.push({
        active: i <= activeCount
      })
    }
    return stars
  }

  mouseOver(event) {
    let { config, halfStar } = this.state
    let { target } = event
    if(!config.edit) return;
    let index = Number(event.target.getAttribute('data-index'))
    let mouseAt = event.pageX - target.offsetLeft - target.parentNode.offsetLeft
    if(config.half) {
      if(mouseAt < config.size / 2) {
        halfStar.at = index
        halfStar.hidden = false
      } else {
        halfStar.hidden = true
      }
    }
    this.setState({
      stars: this.getStars(index)
    })
  }

  mouseOverHalfStar(event) {
    if(!this.state.config.edit || !this.state.config.half) {
      return false;
    }
    this.setState({
      stars: this.getStars(this.state.halfStar.at - 1)
    })
  }

  mouseLeave() {
    if(!this.state.config.edit) return
    this.setState({
      stars: this.getStars()
    })
  }

  mouseLeaveHalfStar() {
    this.state.halfStar.at = this.rateBrakeDown().stars + 1
    this.setState({
      stars: this.getStars()
    })
  }

  clicked(event) {
    if(!this.state.config.edit) return
    const index = Number(event.target.getAttribute('data-index'))
    this.setState({
      value: index,
      stars: this.getStars(index)
    })
    this.props.onChange(index + 1)
  }

  clickedHalfStar(event) {
    let { config, halfStar } = this.state
    if(!config.edit || !config.half) return;
    this.setState({
      value: halfStar.at + 0.5
    })
    this.props.onChange(halfStar.at + 0.5)
  }

  renderHalfStar() {
    let { config, halfStar } = this.state
    if(!config.half) return
    let starLeft = halfStar.at * config.size
    const style = Object.assign({}, halfStarStyles, {
      width:    `${(config.size / 2)}px`,
      fontSize: `${config.size}px`,
      left:     `${starLeft}px`,
      display:   halfStar.hidden ? 'none' : 'block',
      color:     config.color2,
    })
    return (
      <span
        style={style}
        onMouseOver={this.mouseOverHalfStar.bind(this)}
        onMouseMove={this.mouseOverHalfStar.bind(this)}
        onClick={this.clickedHalfStar.bind(this)}
        onMouseLeave={this.mouseLeaveHalfStar.bind(this)}>
        {this.state.config.char}
      </span>
    )
  }

  renderStars() {
    const { color1, color2, size, char } = this.state.config
    return this.state.stars.map((star, i) => {
      const style = Object.assign({}, defaultStyles, {
        color:    star.active ? color2 : color1,
        fontSize: `${size}px`
      })
      return (
        <span
          style={style}
          key={i}
          data-index={i}
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
