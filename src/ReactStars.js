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
      if(this.moreThanHalf(event, config.size)) {
        console.log('mouseover hidden true')
        halfStar.hidden = true
        index = index + 1
      } else {
        halfStar.hidden = false
      }
    }
    halfStar.at = index
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
    if(!this.state.config.edit) return
    if(this.state.value % 1 !== 0) {
      this.state.halfStar.hidden = false
    } else {
      this.state.halfStar.hidden = true
    }
    this.state.halfStar.at = Math.floor(this.state.value)
    this.setState({
      stars: this.getStars()
    })
  }

  clicked(event) {
    if(!this.state.config.edit) return
    const {config, halfStar} = this.state
    let index = Number(event.target.getAttribute('data-index'))
    let value
    if(config.half) {
      if(this.moreThanHalf(event, config.size)) {
        halfStar.hidden = true
        index = index + 1
        value = index
      } else {
        value = index + .5
        halfStar.hidden = false
      }
    }
    halfStar.at = index
    this.setState({
      value: value,
      stars: this.getStars(index)
    })
    this.props.onChange(value)
  }

  renderStyleElement() {
    return (
      <style dangerouslySetInnerHTML={{
        __html: `
        .react-stars-star:before {
        display:block;
        z-index:1;
        position:absolute;
        top:0;
        left:0;
        width: 50%;
        content: attr(data-content);
        overflow:hidden;
        color: ${this.state.config.color2};
        }
        `
      }}></style>
    )
  }

  renderStars() {
    const { color1, color2, size, char } = this.state.config
    return this.state.stars.map((star, i) => {
      let half = ''
      if(!this.state.halfStar.hidden && this.state.halfStar.at === i) {
        half = 'react-stars-star'
      }
      const style = Object.assign({}, defaultStyles, {
        color:    star.active ? color2 : color1,
        fontSize: `${size}px`,
        position: 'relative',
        overflow: 'hidden'
      })
      return (
        <span
          className={half}
          style={style}
          key={i}
          data-index={i}
          onMouseOver={this.mouseOver.bind(this)}
          onMouseMove={this.mouseOver.bind(this)}
          onMouseLeave={this.mouseLeave.bind(this)}
          onClick={this.clicked.bind(this)}
          data-content={char}>
          {char}
        </span>
      )
    })
  }

  render() {
    return (
      <div style={parentStyles}>
        {this.renderStyleElement()}
        {this.renderStars()}
      </div>
    )
  }

}

export default ReactStars
