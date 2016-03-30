import React, { Component } from 'react'

class ReactStars extends Component {

  constructor(props) {
    super(props)

    this.state = {
      starCount: 5,
      initialRating: 3,
      size: 24,
      altChar: '★',
      showMode: false,
      halfStars: true,
      color: 'gray',
      colorActive: ''
    }

    this.styleGeneric = {
      fontSize: `${this.props.size}px`,
      color: this.props.color
    }

    this.styleActive = {
      color: '#ffd700'
    }

  }

  componentWillMount() {
    this.state.stars = []
  }

  componentDidMount() {
    this.setState({
      stars: this.getStars()
    })
  }

  /** Returns an array of stars with their properties */
  getStars() {
    console.log('this.props.starCount', this.state.starCount);
    let stars = []
    for(let i = 0; i < this.state.starCount; i++) {
      stars.push({
        style: Object.assign(this.styleGeneric, this.styleActive),
        html: `${this.state.altChar}`
      })
    }
    return stars
  }

  renderStars() {
    return this.state.stars.map((star) => {
      return star.html
    })
  }

  render() {
    return (
      <div>Here!{this.renderStars()}</div>
    )
  }

}

export default ReactStars
