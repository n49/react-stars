import React, { Component } from 'react'
import PropTypes from 'prop-types'

const parentStyles = {
  overflow: 'hidden',
  position: 'relative'
}

const defaultStyles = {
  position: 'relative',
  overflow: 'hidden',
  display: 'block',
  float: 'left'
}

const getHalfStarStyles = (color, uniqueness) => `
    .react-stars-${uniqueness}:before {
      position: absolute;
      overflow: hidden;
      display: block;
      z-index: 1;
      top: 0;
      left: 0;
      width: 50%;
      content: attr(data-forhalf);
      color: ${color};
  }`


const isDecimal = value => value % 1 !== 0

const moreThanHalf = (event, size) => {
  const { target } = event
  let mouseAt = event.clientX - target.getBoundingClientRect().left
  mouseAt = Math.round(Math.abs(mouseAt))
  return mouseAt > size / 2
}

class ReactStars extends Component {
  constructor(props) {
    super(props)

    const { value, half } = this.props

    this.mouseLeave = this.mouseLeave.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.clicked = this.clicked.bind(this)
    this.renderStars = this.renderStars.bind(this)

    this.state = {
      uniqueness: (`${Math.random()}`).replace('.', ''),
      value,
      stars: this.getStars(value),
      halfStar: {
        at: Math.floor(value),
        hidden: half && value % 1 < 0.5
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { half } = this.props
    this.setState({
      stars: this.getStars(nextProps.value),
      value: nextProps.value,
      halfStar: {
        at: Math.floor(nextProps.value),
        hidden: half && nextProps.value % 1 < 0.5
      }
    })
  }

  getRate() {
    const { value } = this.state
    return this.props.half ? Math.floor(value) : Math.round(value)
  }

  getStars(newCount) {
    const { count } = this.props
    const activeCount = (typeof newCount === 'undefined') ? this.getRate() : newCount
    const stars = []
    for (let i = 0; i < count; i += 1) {
      stars.push({
        active: i <= activeCount - 1
      })
    }
    return stars
  }

  mouseOver(event) {
    const { halfStar } = this.state
    const { half, size } = this.props
    let index = Number(event.target.getAttribute('data-index'))
    if (half) {
      const isAtHalf = moreThanHalf(event, size)
      halfStar.hidden = isAtHalf
      if (isAtHalf) index += 1
      halfStar.at = index
    } else {
      index += 1
    }
    this.setState({
      stars: this.getStars(index)
    })
  }

  mouseLeave() {
    const { value, halfStar } = this.state
    const { half } = this.props
    if (half) {
      halfStar.hidden = !isDecimal(value)
      halfStar.at = Math.floor(this.state.value)
    }
    this.setState({
      stars: this.getStars()
    })
  }

  clicked(event) {
    const { halfStar } = this.state
    const { half, size } = this.props
    let index = Number(event.target.getAttribute('data-index'))
    let value
    if (half) {
      const isAtHalf = this.moreThanHalf(event, size)
      halfStar.hidden = isAtHalf
      if (isAtHalf) index += 1
      value = isAtHalf ? index : index + 0.5
      halfStar.at = index
    } else {
      index += 1
      value = index
    }
    this.setState({
      value,
      stars: this.getStars(index)
    })
    this.props.onChange(value)
  }

  renderHalfStarStyleElement() {
    const { uniqueness } = this.state
    const { color2 } = this.props
    return (
      <style dangerouslySetInnerHTML={{ __html: getHalfStarStyles(color2, uniqueness) }} />
    )
  }

  renderStars() {
    const { halfStar, stars, uniqueness } = this.state
    const { color1, color2, edit, size, char, half } = this.props
    const onClick = edit ? this.clicked : () => {}
    const onMouseOver = edit ? this.mouseOver : () => {}
    const onMouseLeave = edit ? this.mouseLeave : () => {}

    return stars.map((star, i) => {
      let starClass = ''
      if (half && !halfStar.hidden && halfStar.at === i) {
        starClass = `react-stars-${uniqueness}`
      }
      const style = Object.assign({}, defaultStyles, {
        color: star.active ? color2 : color1,
        cursor: edit ? 'pointer' : 'default',
        fontSize: `${size}px`
      });

      return (
        <span
          className={starClass}
          style={style}
          key={`star-${i}`}
          data-index={i}
          data-forhalf={char}
          onMouseOver={onMouseOver}
          onMouseMove={onMouseOver}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          {char}
        </span>
      )
    })
  }

  render() {
    const { className, half } = this.props

    return (
      <div className={className} style={parentStyles}>
        {half && this.renderHalfStarStyleElement()}
        {this.renderStars()}
      </div>
    )
  }
}
ReactStars.displayName = 'ReactStars'
ReactStars.defaultProps = {
  char: '★',
  className: '',
  color1: 'gray',
  color2: '#ffd700',
  count: 5,
  edit: true,
  half: true,
  size: 15,
  value: 0,
  onChange: () => {}
}
ReactStars.propTypes = {
  char: PropTypes.string,
  className: PropTypes.string,
  color1: PropTypes.string,
  color2: PropTypes.string,
  count: PropTypes.number,
  edit: PropTypes.bool,
  half: PropTypes.bool,
  onChange: PropTypes.func,
  size: PropTypes.number,
  value: PropTypes.number
}

export default ReactStars
