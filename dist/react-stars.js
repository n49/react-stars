'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var parentStyles = {
  overflow: 'hidden',
  position: 'relative'
};

var defaultStyles = {
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  display: 'block',
  float: 'left'
};

var getHalfStarStyles = function getHalfStarStyles(color, uniqueness) {
  return '\n    .react-stars-' + uniqueness + ':before {\n      position: absolute;\n      overflow: hidden;\n      display: block;\n      z-index: 1;\n      top: 0; left: 0;\n      width: 50%;\n      content: attr(data-forhalf);\n      color: ' + color + ';\n  }';
};

var ReactStars = function (_Component) {
  _inherits(ReactStars, _Component);

  function ReactStars(props) {
    _classCallCheck(this, ReactStars);

    // set defaults

    var _this = _possibleConstructorReturn(this, (ReactStars.__proto__ || Object.getPrototypeOf(ReactStars)).call(this, props));

    props = _extends({}, props);

    _this.state = {
      uniqueness: (Math.random() + '').replace('.', ''),
      value: props.value || 0,
      stars: [],
      halfStar: {
        at: Math.floor(props.value),
        hidden: props.half && props.value % 1 < 0.5
      }
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
      edit: props.edit
    };

    return _this;
  }

  _createClass(ReactStars, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        stars: this.getStars(this.state.value)
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        stars: this.getStars(props.value),
        value: props.value,
        halfStar: {
          at: Math.floor(props.value),
          hidden: this.state.config.half && props.value % 1 < 0.5
        }
      });
    }
  }, {
    key: 'isDecimal',
    value: function isDecimal(value) {
      return value % 1 !== 0;
    }
  }, {
    key: 'getRate',
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
    key: 'getStars',
    value: function getStars(activeCount) {
      if (typeof activeCount === 'undefined') {
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
    key: 'mouseOver',
    value: function mouseOver(event) {
      var _state = this.state,
          config = _state.config,
          halfStar = _state.halfStar;

      if (!config.edit) return;
      var index = Number(event.target.getAttribute('data-index'));
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
    key: 'moreThanHalf',
    value: function moreThanHalf(event, size) {
      var target = event.target;

      var mouseAt = event.clientX - target.getBoundingClientRect().left;
      mouseAt = Math.round(Math.abs(mouseAt));
      return mouseAt > size / 2;
    }
  }, {
    key: 'mouseLeave',
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
    key: 'clicked',
    value: function clicked(event) {
      var _state3 = this.state,
          config = _state3.config,
          halfStar = _state3.halfStar;

      if (!config.edit) return;
      var index = Number(event.target.getAttribute('data-index'));
      var value = void 0;
      if (config.half) {
        var isAtHalf = this.moreThanHalf(event, config.size);
        halfStar.hidden = isAtHalf;
        if (isAtHalf) index = index + 1;
        value = isAtHalf ? index : index + .5;
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
    key: 'renderHalfStarStyleElement',
    value: function renderHalfStarStyleElement() {
      var _state4 = this.state,
          config = _state4.config,
          uniqueness = _state4.uniqueness;

      return _react2.default.createElement('style', { dangerouslySetInnerHTML: {
          __html: getHalfStarStyles(config.color2, uniqueness)
        } });
    }
  }, {
    key: 'renderStars',
    value: function renderStars() {
      var _this2 = this;

      var _state5 = this.state,
          halfStar = _state5.halfStar,
          stars = _state5.stars,
          uniqueness = _state5.uniqueness,
          config = _state5.config;
      var color1 = config.color1,
          color2 = config.color2,
          size = config.size,
          char = config.char,
          half = config.half,
          edit = config.edit;

      return stars.map(function (star, i) {
        var starClass = '';
        if (half && !halfStar.hidden && halfStar.at === i) {
          starClass = 'react-stars-' + uniqueness;
        }
        var style = _extends({}, defaultStyles, {
          color: star.active ? color2 : color1,
          cursor: edit ? 'pointer' : 'default',
          fontSize: size + 'px'
        });
        return _react2.default.createElement(
          'span',
          {
            className: starClass,
            style: style,
            key: i,
            'data-index': i,
            'data-forhalf': char,
            onMouseOver: _this2.mouseOver.bind(_this2),
            onMouseMove: _this2.mouseOver.bind(_this2),
            onMouseLeave: _this2.mouseLeave.bind(_this2),
            onClick: _this2.clicked.bind(_this2) },
          char
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className;


      return _react2.default.createElement(
        'div',
        { className: className, style: parentStyles },
        this.state.config.half ? this.renderHalfStarStyleElement() : '',
        this.renderStars()
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
  color2: _propTypes2.default.string
};

ReactStars.defaultProps = {
  edit: true,
  half: true,
  value: 0,
  count: 5,
  char: '★',
  size: 15,
  color1: 'gray',
  color2: '#ffd700',

  onChange: function onChange() {}
};

exports.default = ReactStars;