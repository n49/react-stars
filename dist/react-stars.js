"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var parentStyles = {
  overflow: "hidden",
  position: "relative"
};

var defaultStyles = {
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  display: "block",
  float: "left"
};

var getHalfStarStyles = function getHalfStarStyles(color, uniqueness) {
  return "\n    .react-stars-" + uniqueness + ":before {\n      position: absolute;\n      overflow: hidden;\n      display: block;\n      z-index: 1;\n      top: 0; left: 0;\n      width: 50%;\n      content: attr(data-forhalf);\n      color: " + color + ";\n  }";
};
var getHalfStarStyleForIcons = function getHalfStarStyleForIcons(color) {
  return "\n        span.react-stars-half > * {\n        color: " + color + ";\n    }";
};

var ReactStars = function (_Component) {
  _inherits(ReactStars, _Component);

  function ReactStars(props) {
    _classCallCheck(this, ReactStars);

    // set defaults

    var _this = _possibleConstructorReturn(this, (ReactStars.__proto__ || Object.getPrototypeOf(ReactStars)).call(this, props));

    props = _extends({}, props);

    _this.state = {
      uniqueness: (Math.random() + "").replace(".", ""),
      value: props.value || 0,
      stars: [],
      halfStar: {
        at: Math.floor(props.value),
        hidden: props.half && props.value % 1 < 0.5
      },
      isUsingIcons: !props.half && props.emptyIcon && props.filledIcon || props.half && props.emptyIcon && props.halfIcon && props.filledIcon ? true : false
    };

    _this.state.config = {
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
      a11y: props.a11y
    };
    return _this;
  }

  _createClass(ReactStars, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        stars: this.getStars(this.state.value)
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.setState({
        stars: this.getStars(props.value),
        value: props.value,
        halfStar: {
          at: Math.floor(props.value),
          hidden: this.state.config.half && props.value % 1 < 0.5
        },
        config: _extends({}, this.state.config, {
          count: props.count,
          size: props.size,
          char: props.char,
          color1: props.color1,
          color2: props.color2,
          half: props.half,
          edit: props.edit
        })
      });
    }
  }, {
    key: "isDecimal",
    value: function isDecimal(value) {
      return value % 1 !== 0;
    }
  }, {
    key: "getRate",
    value: function getRate() {
      var stars = void 0;
      if (this.state.config.half) {
        stars = Math.floor(this.state.value);
      } else {
        stars = Math.round(this.state.value);
      }
      return stars;
    }
  }, {
    key: "getStars",
    value: function getStars(activeCount) {
      if (typeof activeCount === "undefined") {
        activeCount = this.getRate();
      }
      var stars = [];
      for (var i = 0; i < this.state.config.count; i++) {
        stars.push({
          active: i <= activeCount - 1
        });
      }
      return stars;
    }
  }, {
    key: "mouseOver",
    value: function mouseOver(event) {
      var _state = this.state,
          config = _state.config,
          halfStar = _state.halfStar;

      if (!config.edit) return;
      var index = Number(event.currentTarget.getAttribute("data-index"));
      if (config.half) {
        var isAtHalf = this.moreThanHalf(event, config.size);
        halfStar.hidden = isAtHalf;
        if (isAtHalf) index = index + 1;
        halfStar.at = index;
      } else {
        index = index + 1;
      }
      this.setState({
        stars: this.getStars(index)
      });
    }
  }, {
    key: "moreThanHalf",
    value: function moreThanHalf(event, size) {
      var target = event.target;

      var mouseAt = event.clientX - target.getBoundingClientRect().left;
      mouseAt = Math.round(Math.abs(mouseAt));
      return mouseAt > size / 2;
    }
  }, {
    key: "mouseLeave",
    value: function mouseLeave() {
      var _state2 = this.state,
          value = _state2.value,
          halfStar = _state2.halfStar,
          config = _state2.config;

      if (!config.edit) return;
      if (config.half) {
        halfStar.hidden = !this.isDecimal(value);
        halfStar.at = Math.floor(this.state.value);
      }
      this.setState({
        stars: this.getStars()
      });
    }
  }, {
    key: "clicked",
    value: function clicked(event) {
      var _state3 = this.state,
          config = _state3.config,
          halfStar = _state3.halfStar;

      if (!config.edit) return;
      var index = Number(event.currentTarget.getAttribute("data-index"));
      var value = void 0;
      if (config.half) {
        var isAtHalf = this.moreThanHalf(event, config.size);
        halfStar.hidden = isAtHalf;
        if (isAtHalf) index = index + 1;
        value = isAtHalf ? index : index + 0.5;
        halfStar.at = index;
      } else {
        value = index = index + 1;
      }
      this.setState({
        value: value,
        stars: this.getStars(index)
      });
      this.props.onChange(value);
    }
  }, {
    key: "renderHalfStarStyleElement",
    value: function renderHalfStarStyleElement() {
      var _state4 = this.state,
          config = _state4.config,
          uniqueness = _state4.uniqueness,
          isUsingIcons = _state4.isUsingIcons;

      return _react2.default.createElement("style", {
        dangerouslySetInnerHTML: {
          __html: isUsingIcons ? getHalfStarStyleForIcons(config.color2) : getHalfStarStyles(config.color2, uniqueness)
        }
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      var _this2 = this;

      var key = event.key;
      var _state5 = this.state,
          value = _state5.value,
          config = _state5.config;


      var keyNumber = Number(key); // e.g. "1" => 1, "ArrowUp" => NaN
      if (keyNumber) {
        // number
        if (Number.isInteger(keyNumber) && keyNumber > 0 && keyNumber <= config.count) {
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

      this.setState(function (prevState) {
        return {
          value: value,
          stars: _this2.getStars(value),
          halfStar: config.half ? {
            hidden: Number.isInteger(value),
            at: Math.floor(value)
          } : prevState.halfStar
        };
      });
      this.props.onChange(value);
    }
  }, {
    key: "renderStars",
    value: function renderStars() {
      var _this3 = this;

      var _state6 = this.state,
          halfStar = _state6.halfStar,
          stars = _state6.stars,
          uniqueness = _state6.uniqueness,
          config = _state6.config,
          isUsingIcons = _state6.isUsingIcons;
      var color1 = config.color1,
          color2 = config.color2,
          size = config.size,
          char = config.char,
          half = config.half,
          edit = config.edit,
          halfIcon = config.halfIcon,
          emptyIcon = config.emptyIcon,
          filledIcon = config.filledIcon;

      return stars.map(function (star, i) {
        var starClass = "";
        var isHalf = false;
        if (half && !halfStar.hidden && halfStar.at === i) {
          if (!isUsingIcons) starClass = "react-stars-" + uniqueness;else starClass = "react-stars-half";
          isHalf = true;
        }
        var style = _extends({}, defaultStyles, {
          color: star.active ? color2 : color1,
          cursor: edit ? "pointer" : "default",
          fontSize: size + "px"
        });
        return _react2.default.createElement(
          "span",
          {
            className: starClass,
            style: style,
            key: i,
            "data-index": i,
            "data-forhalf": filledIcon ? i : char,
            onMouseOver: _this3.mouseOver.bind(_this3),
            onMouseMove: _this3.mouseOver.bind(_this3),
            onMouseLeave: _this3.mouseLeave.bind(_this3),
            onClick: _this3.clicked.bind(_this3)
          },
          !isUsingIcons && char,
          isUsingIcons && (star.active && filledIcon || !star.active && isHalf && halfIcon || !star.active && !isHalf && emptyIcon)
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.props.className;
      var _state7 = this.state,
          config = _state7.config,
          value = _state7.value;


      return _react2.default.createElement(
        "div",
        { style: { display: "flex" } },
        _react2.default.createElement(
          "div",
          {
            tabIndex: config.a11y && config.edit ? 0 : null,
            "aria-label": "add rating by typing an integer from 0 to 5 or pressing arrow keys",
            onKeyDown: config.a11y && config.edit ? this.handleKeyDown.bind(this) : null,
            className: className,
            style: parentStyles
          },
          config.half ? this.renderHalfStarStyleElement() : "",
          this.renderStars(),
          _react2.default.createElement(
            "p",
            { style: { position: "absolute", left: "-200rem" }, role: "status" },
            value
          )
        )
      );
    }
  }]);

  return ReactStars;
}(_react.Component);

ReactStars.propTypes = {
  className: _propTypes2.default.string,
  edit: _propTypes2.default.bool,
  half: _propTypes2.default.bool,
  value: _propTypes2.default.number,
  count: _propTypes2.default.number,
  char: _propTypes2.default.string,
  size: _propTypes2.default.number,
  color1: _propTypes2.default.string,
  color2: _propTypes2.default.string,
  emptyIcon: _propTypes2.default.element,
  halfIcon: _propTypes2.default.element,
  filledIcon: _propTypes2.default.element,
  a11y: _propTypes2.default.bool
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

  onChange: function onChange() {}
};

exports.default = ReactStars;