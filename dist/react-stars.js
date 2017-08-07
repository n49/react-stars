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
  display: 'block',
  float: 'left'
};

var getHalfStarStyles = function getHalfStarStyles(color, uniqueness) {
  return '\n    .react-stars-' + uniqueness + ':before {\n      position: absolute;\n      overflow: hidden;\n      display: block;\n      z-index: 1;\n      top: 0;\n      left: 0;\n      width: 50%;\n      content: attr(data-forhalf);\n      color: ' + color + ';\n  }';
};

var isDecimal = function isDecimal(value) {
  return value % 1 !== 0;
};

var moreThanHalf = function moreThanHalf(event, size) {
  var target = event.target;

  var mouseAt = event.clientX - target.getBoundingClientRect().left;
  mouseAt = Math.round(Math.abs(mouseAt));
  return mouseAt > size / 2;
};

var ReactStars = function (_Component) {
  _inherits(ReactStars, _Component);

  function ReactStars(props) {
    _classCallCheck(this, ReactStars);

    var _this = _possibleConstructorReturn(this, (ReactStars.__proto__ || Object.getPrototypeOf(ReactStars)).call(this, props));

    var _this$props = _this.props,
        value = _this$props.value,
        half = _this$props.half;


    _this.mouseLeave = _this.mouseLeave.bind(_this);
    _this.mouseOver = _this.mouseOver.bind(_this);
    _this.clicked = _this.clicked.bind(_this);
    _this.renderStars = _this.renderStars.bind(_this);

    _this.state = {
      uniqueness: ('' + Math.random()).replace('.', ''),
      value: value,
      stars: _this.getStars(value),
      halfStar: {
        at: Math.floor(value),
        hidden: half && value % 1 < 0.5
      }
    };
    return _this;
  }

  _createClass(ReactStars, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var half = this.props.half;

      this.setState({
        stars: this.getStars(nextProps.value),
        value: nextProps.value,
        halfStar: {
          at: Math.floor(nextProps.value),
          hidden: half && nextProps.value % 1 < 0.5
        }
      });
    }
  }, {
    key: 'getRate',
    value: function getRate() {
      var value = this.state.value;

      return this.props.half ? Math.floor(value) : Math.round(value);
    }
  }, {
    key: 'getStars',
    value: function getStars(newCount) {
      var count = this.props.count;

      var activeCount = typeof newCount === 'undefined' ? this.getRate() : newCount;
      var stars = [];
      for (var i = 0; i < count; i += 1) {
        stars.push({
          active: i <= activeCount - 1
        });
      }
      return stars;
    }
  }, {
    key: 'mouseOver',
    value: function mouseOver(event) {
      var halfStar = this.state.halfStar;
      var _props = this.props,
          half = _props.half,
          size = _props.size;

      var index = Number(event.target.getAttribute('data-index'));
      if (half) {
        var isAtHalf = moreThanHalf(event, size);
        halfStar.hidden = isAtHalf;
        if (isAtHalf) index += 1;
        halfStar.at = index;
      } else {
        index += 1;
      }
      this.setState({
        stars: this.getStars(index)
      });
    }
  }, {
    key: 'mouseLeave',
    value: function mouseLeave() {
      var _state = this.state,
          value = _state.value,
          halfStar = _state.halfStar;
      var half = this.props.half;

      if (half) {
        halfStar.hidden = !isDecimal(value);
        halfStar.at = Math.floor(this.state.value);
      }
      this.setState({
        stars: this.getStars()
      });
    }
  }, {
    key: 'clicked',
    value: function clicked(event) {
      var halfStar = this.state.halfStar;
      var _props2 = this.props,
          half = _props2.half,
          size = _props2.size;

      var index = Number(event.target.getAttribute('data-index'));
      var value = void 0;
      if (half) {
        var isAtHalf = moreThanHalf(event, size);
        halfStar.hidden = isAtHalf;
        if (isAtHalf) index += 1;
        value = isAtHalf ? index : index + 0.5;
        halfStar.at = index;
      } else {
        index += 1;
        value = index;
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
      var uniqueness = this.state.uniqueness;
      var color2 = this.props.color2;

      return _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: getHalfStarStyles(color2, uniqueness) } });
    }
  }, {
    key: 'renderStars',
    value: function renderStars() {
      var _state2 = this.state,
          halfStar = _state2.halfStar,
          stars = _state2.stars,
          uniqueness = _state2.uniqueness;
      var _props3 = this.props,
          color1 = _props3.color1,
          color2 = _props3.color2,
          edit = _props3.edit,
          size = _props3.size,
          char = _props3.char,
          half = _props3.half;

      var onClick = edit ? this.clicked : function () {};
      var onMouseOver = edit ? this.mouseOver : function () {};
      var onMouseLeave = edit ? this.mouseLeave : function () {};

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
            key: 'star-' + i,
            'data-index': i,
            'data-forhalf': char,
            onMouseOver: onMouseOver,
            onMouseMove: onMouseOver,
            onMouseLeave: onMouseLeave,
            onClick: onClick
          },
          char
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          className = _props4.className,
          half = _props4.half;


      return _react2.default.createElement(
        'div',
        { className: className, style: parentStyles },
        half && this.renderHalfStarStyleElement(),
        this.renderStars()
      );
    }
  }]);

  return ReactStars;
}(_react.Component);

ReactStars.displayName = 'ReactStars';
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
  onChange: function onChange() {}
};
ReactStars.propTypes = {
  char: _propTypes2.default.string,
  className: _propTypes2.default.string,
  color1: _propTypes2.default.string,
  color2: _propTypes2.default.string,
  count: _propTypes2.default.number,
  edit: _propTypes2.default.bool,
  half: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  size: _propTypes2.default.number,
  value: _propTypes2.default.number
};

exports.default = ReactStars;