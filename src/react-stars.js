import React, { Component } from "react";
import PropTypes from "prop-types";

const parentStyles = {
  overflow: "hidden",
  position: "relative",
};

const defaultStyles = {
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  display: "block",
  float: "left",
};

const getHalfStarStyles = (color, uniqueness) => {
  return `
    .react-stars-${uniqueness}:before {
      position: absolute;
      overflow: hidden;
      display: block;
      z-index: 1;
      top: 0; left: 0;
      width: 50%;
      content: attr(data-forhalf);
      color: ${color};
  }`;
};
const getHalfStarStyleForIcons = (color) => {
  return `
        span.react-stars-half > * {
        color: ${color};
    }`;
};

class ReactStars extends Component {
  constructor(props) {
    super(props);

    // set defaults

    props = Object.assign({}, props);

    this.state = {
      uniqueness: (Math.random() + "").replace(".", ""),
      value: props.value || 0,
      stars: [],
      halfStar: {
        at: Math.floor(props.value),
        hidden: props.half && props.value % 1 < 0.5,
      },
      isUsingIcons:
        (!props.half && props.emptyIcon && props.filledIcon) ||
        (props.half && props.emptyIcon && props.halfIcon && props.filledIcon)
          ? true
          : false,
    };

    this.state.config = {
      count: props.count,
      size: props.size,
      char: props.char,
      // default color of inactive star
      color1: props.color1,
      // color of an active star
      color2: props.color2,
      half: props.half,
      edit: props.edit,
      emptyIcon: props.emptyIcon,
      halfIcon: props.halfIcon,
      filledIcon: props.filledIcon,
      a11y: props.a11y,
    };
  }

  componentDidMount() {
    this.setState({
      stars: this.getStars(this.state.value),
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      stars: this.getStars(props.value),
      value: props.value,
      halfStar: {
        at: Math.floor(props.value),
        hidden: this.state.config.half && props.value % 1 < 0.5,
      },
      config: Object.assign({}, this.state.config, {
        count: props.count,
        size: props.size,
        char: props.char,
        color1: props.color1,
        color2: props.color2,
        half: props.half,
        edit: props.edit,
      }),
    });
  }

  isDecimal(value) {
    return value % 1 !== 0;
  }

  getRate() {
    let stars;
    if (this.state.config.half) {
      stars = Math.floor(this.state.value);
    } else {
      stars = Math.round(this.state.value);
    }
    return stars;
  }

  getStars(activeCount) {
    if (typeof activeCount === "undefined") {
      activeCount = this.getRate();
    }
    let stars = [];
    for (let i = 0; i < this.state.config.count; i++) {
      stars.push({
        active: i <= activeCount - 1,
      });
    }
    return stars;
  }

  mouseOver(event) {
    let { config, halfStar } = this.state;
    if (!config.edit) return;
    let index = Number(event.currentTarget.getAttribute("data-index"));
    if (config.half) {
      const isAtHalf = this.moreThanHalf(event, config.size);
      halfStar.hidden = isAtHalf;
      if (isAtHalf) index = index + 1;
      halfStar.at = index;
    } else {
      index = index + 1;
    }
    this.setState({
      stars: this.getStars(index),
    });
  }

  moreThanHalf(event, size) {
    let { target } = event;
    var mouseAt = event.clientX - target.getBoundingClientRect().left;
    mouseAt = Math.round(Math.abs(mouseAt));
    return mouseAt > size / 2;
  }

  mouseLeave() {
    const { value, halfStar, config } = this.state;
    if (!config.edit) return;
    if (config.half) {
      halfStar.hidden = !this.isDecimal(value);
      halfStar.at = Math.floor(this.state.value);
    }
    this.setState({
      stars: this.getStars(),
    });
  }

  clicked(event) {
    const { config, halfStar } = this.state;
    if (!config.edit) return;
    let index = Number(event.currentTarget.getAttribute("data-index"));
    let value;
    if (config.half) {
      const isAtHalf = this.moreThanHalf(event, config.size);
      halfStar.hidden = isAtHalf;
      if (isAtHalf) index = index + 1;
      value = isAtHalf ? index : index + 0.5;
      halfStar.at = index;
    } else {
      value = index = index + 1;
    }
    this.setState({
      value: value,
      stars: this.getStars(index),
    });
    this.props.onChange(value);
  }

  renderHalfStarStyleElement() {
    const { config, uniqueness, isUsingIcons } = this.state;
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: isUsingIcons
            ? getHalfStarStyleForIcons(config.color2)
            : getHalfStarStyles(config.color2, uniqueness),
        }}
      ></style>
    );
  }

  handleKeyDown(event) {
    const { key } = event;
    let { value, config } = this.state;

    const keyNumber = Number(key); // e.g. "1" => 1, "ArrowUp" => NaN
    if (keyNumber) {
      // number
      if (
        Number.isInteger(keyNumber) &&
        keyNumber > 0 &&
        keyNumber <= config.count
      ) {
        value = keyNumber;
      }
    } else {
      // string
      if ((key === "ArrowUp" || key === "ArrowRight") && value < config.count) {
        event.preventDefault();
        value += config.half ? 0.5 : 1;
      } else if ((key === "ArrowDown" || key === "ArrowLeft") && value > 0.5) {
        event.preventDefault();
        value -= config.half ? 0.5 : 1;
      }
    }

    this.setState((prevState) => ({
      value,
      stars: this.getStars(value),
      halfStar: config.half
        ? {
            hidden: Number.isInteger(value),
            at: Math.floor(value),
          }
        : prevState.halfStar,
    }));
    this.props.onChange(value);
  }

  renderStars() {
    const { halfStar, stars, uniqueness, config, isUsingIcons } = this.state;
    const {
      color1,
      color2,
      size,
      char,
      half,
      edit,
      halfIcon,
      emptyIcon,
      filledIcon,
    } = config;
    return stars.map((star, i) => {
      let starClass = "";
      let isHalf = false;
      if (half && !halfStar.hidden && halfStar.at === i) {
        if (!isUsingIcons) starClass = `react-stars-${uniqueness}`;
        else starClass = `react-stars-half`;
        isHalf = true;
      }
      const style = Object.assign({}, defaultStyles, {
        color: star.active ? color2 : color1,
        cursor: edit ? "pointer" : "default",
        fontSize: `${size}px`,
      });
      return (
        <span
          className={starClass}
          style={style}
          key={i}
          data-index={i}
          data-forhalf={filledIcon ? i : char}
          onMouseOver={this.mouseOver.bind(this)}
          onMouseMove={this.mouseOver.bind(this)}
          onMouseLeave={this.mouseLeave.bind(this)}
          onClick={this.clicked.bind(this)}
        >
          {!isUsingIcons && char}
          {isUsingIcons &&
            ((star.active && filledIcon) ||
              (!star.active && isHalf && halfIcon) ||
              (!star.active && !isHalf && emptyIcon))}
        </span>
      );
    });
  }

  render() {
    const { className } = this.props;

    const { config, value } = this.state;

    return (
      <div style={{ display: "flex" }}>
        <div
          tabIndex={config.a11y && config.edit ? 0 : null}
          aria-label="add rating by typing an integer from 0 to 5 or pressing arrow keys"
          onKeyDown={
            config.a11y && config.edit ? this.handleKeyDown.bind(this) : null
          }
          className={className}
          style={parentStyles}
        >
          {config.half ? this.renderHalfStarStyleElement() : ""}
          {this.renderStars()}
          <p style={{ position: "absolute", left: "-200rem" }} role="status">
            {value}
          </p>
        </div>
      </div>
    );
  }
}

ReactStars.propTypes = {
  className: PropTypes.string,
  edit: PropTypes.bool,
  half: PropTypes.bool,
  value: PropTypes.number,
  count: PropTypes.number,
  char: PropTypes.string,
  size: PropTypes.number,
  color1: PropTypes.string,
  color2: PropTypes.string,
  emptyIcon: PropTypes.element,
  halfIcon: PropTypes.element,
  filledIcon: PropTypes.element,
  a11y: PropTypes.bool,
};

ReactStars.defaultProps = {
  edit: true,
  half: true,
  value: 0,
  count: 5,
  char: "★",
  size: 15,
  color1: "gray",
  color2: "#ffd700",
  a11y: true,

  onChange: () => {},
};

export default ReactStars;
