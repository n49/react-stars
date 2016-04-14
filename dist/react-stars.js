'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactStars).call(this, props));

    props = Object.assign({}, props);

    if (typeof props.edit === 'undefined') {
      props.edit = true;
    } else {
      props.edit = false;
    }

    if (typeof props.half === 'undefined') {
      props.half = true;
    } else {
      props.half = false;
    }

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
      count: props.count || 5,
      size: props.size || 15,
      char: props.char || '★',
      // default color of inactive star
      color1: props.color1 || 'gray',
      // color of an active star
      color2: props.color2 || '#ffd700',
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
      var _state = this.state;
      var config = _state.config;
      var halfStar = _state.halfStar;

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
      var _state2 = this.state;
      var value = _state2.value;
      var halfStar = _state2.halfStar;
      var config = _state2.config;

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
      var _state3 = this.state;
      var config = _state3.config;
      var halfStar = _state3.halfStar;

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
      var _state4 = this.state;
      var config = _state4.config;
      var uniqueness = _state4.uniqueness;

      return _react2.default.createElement('style', { dangerouslySetInnerHTML: {
          __html: getHalfStarStyles(config.color2, uniqueness)
        } });
    }
  }, {
    key: 'renderStars',
    value: function renderStars() {
      var _this2 = this;

      var _state5 = this.state;
      var halfStar = _state5.halfStar;
      var stars = _state5.stars;
      var uniqueness = _state5.uniqueness;
      var _state$config = this.state.config;
      var color1 = _state$config.color1;
      var color2 = _state$config.color2;
      var size = _state$config.size;
      var char = _state$config.char;
      var half = _state$config.half;

      return stars.map(function (star, i) {
        var starClass = '';
        if (half && !halfStar.hidden && halfStar.at === i) {
          starClass = 'react-stars-' + uniqueness;
        }
        var style = Object.assign({}, defaultStyles, {
          color: star.active ? color2 : color1,
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
      return _react2.default.createElement(
        'div',
        { style: parentStyles },
        this.state.config.half ? this.renderHalfStarStyleElement() : '',
        this.renderStars()
      );
    }
  }]);

  return ReactStars;
}(_react.Component);

exports.default = ReactStars;