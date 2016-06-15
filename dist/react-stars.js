'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  (0, _inherits3.default)(ReactStars, _Component);

  function ReactStars(props) {
    (0, _classCallCheck3.default)(this, ReactStars);


    // set defaults

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ReactStars).call(this, props));

    props = (0, _assign2.default)({}, props);

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

  (0, _createClass3.default)(ReactStars, [{
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
        var style = (0, _assign2.default)({}, defaultStyles, {
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

ReactStars.propTypes = {
  edit: _react.PropTypes.bool,
  half: _react.PropTypes.bool,
  value: _react.PropTypes.number,
  count: _react.PropTypes.number,
  char: _react.PropTypes.string,
  size: _react.PropTypes.number,
  color1: _react.PropTypes.string,
  color2: _react.PropTypes.string
};

exports.default = ReactStars;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWFjdC1zdGFycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTSxlQUFlO0FBQ25CLFlBQVUsUUFEUztBQUVuQixZQUFVO0FBRlMsQ0FBckI7O0FBS0EsSUFBTSxnQkFBZ0I7QUFDcEIsWUFBVSxVQURVO0FBRXBCLFlBQVUsUUFGVTtBQUdwQixVQUFVLFNBSFU7QUFJcEIsV0FBVSxPQUpVO0FBS3BCLFNBQVU7QUFMVSxDQUF0Qjs7QUFRQSxJQUFNLG9CQUFvQixTQUFwQixpQkFBb0IsQ0FBQyxLQUFELEVBQVEsVUFBUixFQUF1QjtBQUMvQyxpQ0FDaUIsVUFEakIsNk1BU2EsS0FUYjtBQVdELENBWkQ7O0lBY00sVTs7O0FBRUosc0JBQVksS0FBWixFQUFtQjtBQUFBOzs7OztBQUFBLG9IQUVYLEtBRlc7O0FBTWpCLFlBQVEsc0JBQWMsRUFBZCxFQUFrQixLQUFsQixDQUFSOztBQUVBLFFBQUcsT0FBTyxNQUFNLElBQWIsS0FBc0IsV0FBekIsRUFBc0M7QUFDcEMsWUFBTSxJQUFOLEdBQWEsSUFBYjtBQUNELEtBRkQsTUFFTztBQUNMLFlBQU0sSUFBTixHQUFhLEtBQWI7QUFDRDs7QUFFRCxRQUFHLE9BQU8sTUFBTSxJQUFiLEtBQXNCLFdBQXpCLEVBQXNDO0FBQ3BDLFlBQU0sSUFBTixHQUFhLElBQWI7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFNLElBQU4sR0FBYSxLQUFiO0FBQ0Q7O0FBRUQsVUFBSyxLQUFMLEdBQWE7QUFDWCxrQkFBWSxDQUFDLEtBQUssTUFBTCxLQUFnQixFQUFqQixFQUFxQixPQUFyQixDQUE2QixHQUE3QixFQUFrQyxFQUFsQyxDQUREO0FBRVgsYUFBTyxNQUFNLEtBQU4sSUFBZSxDQUZYO0FBR1gsYUFBTyxFQUhJO0FBSVgsZ0JBQVU7QUFDUixZQUFJLEtBQUssS0FBTCxDQUFXLE1BQU0sS0FBakIsQ0FESTtBQUVSLGdCQUFRLE1BQU0sSUFBTixJQUFjLE1BQU0sS0FBTixHQUFjLENBQWQsR0FBa0I7QUFGaEM7QUFKQyxLQUFiOztBQVVBLFVBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0I7QUFDbEIsYUFBUSxNQUFNLEtBQU4sSUFBZSxDQURMO0FBRWxCLFlBQVEsTUFBTSxJQUFOLElBQWMsRUFGSjtBQUdsQixZQUFRLE1BQU0sSUFBTixJQUFjLEdBSEo7O0FBS2xCLGNBQVEsTUFBTSxNQUFOLElBQWdCLE1BTE47O0FBT2xCLGNBQVEsTUFBTSxNQUFOLElBQWdCLFNBUE47QUFRbEIsWUFBUSxNQUFNLElBUkk7QUFTbEIsWUFBUSxNQUFNO0FBVEksS0FBcEI7O0FBOUJpQjtBQTBDbEI7Ozs7d0NBRW1CO0FBQ2xCLFdBQUssUUFBTCxDQUFjO0FBQ1osZUFBTyxLQUFLLFFBQUwsQ0FBYyxLQUFLLEtBQUwsQ0FBVyxLQUF6QjtBQURLLE9BQWQ7QUFHRDs7OzhDQUV5QixLLEVBQU87QUFDL0IsV0FBSyxRQUFMLENBQWM7QUFDWixlQUFPLEtBQUssUUFBTCxDQUFjLE1BQU0sS0FBcEIsQ0FESztBQUVaLGVBQU8sTUFBTSxLQUZEO0FBR1osa0JBQVU7QUFDUixjQUFJLEtBQUssS0FBTCxDQUFXLE1BQU0sS0FBakIsQ0FESTtBQUVSLGtCQUFRLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsSUFBbEIsSUFBMEIsTUFBTSxLQUFOLEdBQWMsQ0FBZCxHQUFrQjtBQUY1QztBQUhFLE9BQWQ7QUFRRDs7OzhCQUVTLEssRUFBTztBQUNmLGFBQU8sUUFBUSxDQUFSLEtBQWMsQ0FBckI7QUFDRDs7OzhCQUVTO0FBQ1IsVUFBSSxjQUFKO0FBQ0EsVUFBRyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLElBQXJCLEVBQTJCO0FBQ3pCLGdCQUFRLEtBQUssS0FBTCxDQUFXLEtBQUssS0FBTCxDQUFXLEtBQXRCLENBQVI7QUFDRCxPQUZELE1BRU87QUFDTCxnQkFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBVyxLQUF0QixDQUFSO0FBQ0Q7QUFDRCxhQUFPLEtBQVA7QUFDRDs7OzZCQUVRLFcsRUFBYTtBQUNwQixVQUFHLE9BQU8sV0FBUCxLQUF1QixXQUExQixFQUF1QztBQUNyQyxzQkFBYyxLQUFLLE9BQUwsRUFBZDtBQUNEO0FBQ0QsVUFBSSxRQUFRLEVBQVo7QUFDQSxXQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQXJDLEVBQTRDLEdBQTVDLEVBQWlEO0FBQy9DLGNBQU0sSUFBTixDQUFXO0FBQ1Qsa0JBQVEsS0FBSyxjQUFjO0FBRGxCLFNBQVg7QUFHRDtBQUNELGFBQU8sS0FBUDtBQUNEOzs7OEJBRVMsSyxFQUFPO0FBQUEsbUJBQ1ksS0FBSyxLQURqQjtBQUFBLFVBQ1QsTUFEUyxVQUNULE1BRFM7QUFBQSxVQUNELFFBREMsVUFDRCxRQURDOztBQUVmLFVBQUcsQ0FBQyxPQUFPLElBQVgsRUFBaUI7QUFDakIsVUFBSSxRQUFRLE9BQU8sTUFBTSxNQUFOLENBQWEsWUFBYixDQUEwQixZQUExQixDQUFQLENBQVo7QUFDQSxVQUFHLE9BQU8sSUFBVixFQUFnQjtBQUNkLFlBQU0sV0FBVyxLQUFLLFlBQUwsQ0FBa0IsS0FBbEIsRUFBeUIsT0FBTyxJQUFoQyxDQUFqQjtBQUNBLGlCQUFTLE1BQVQsR0FBa0IsUUFBbEI7QUFDQSxZQUFHLFFBQUgsRUFBYSxRQUFRLFFBQVEsQ0FBaEI7QUFDYixpQkFBUyxFQUFULEdBQWMsS0FBZDtBQUNELE9BTEQsTUFLTztBQUNMLGdCQUFRLFFBQVEsQ0FBaEI7QUFDRDtBQUNELFdBQUssUUFBTCxDQUFjO0FBQ1osZUFBTyxLQUFLLFFBQUwsQ0FBYyxLQUFkO0FBREssT0FBZDtBQUdEOzs7aUNBRVksSyxFQUFPLEksRUFBTTtBQUFBLFVBQ2xCLE1BRGtCLEdBQ1AsS0FETyxDQUNsQixNQURrQjs7QUFFeEIsVUFBSSxVQUFVLE1BQU0sT0FBTixHQUFnQixPQUFPLHFCQUFQLEdBQStCLElBQTdEO0FBQ0EsZ0JBQVUsS0FBSyxLQUFMLENBQVcsS0FBSyxHQUFMLENBQVMsT0FBVCxDQUFYLENBQVY7QUFDQSxhQUFPLFVBQVUsT0FBTyxDQUF4QjtBQUNEOzs7aUNBRVk7QUFBQSxvQkFDeUIsS0FBSyxLQUQ5QjtBQUFBLFVBQ0gsS0FERyxXQUNILEtBREc7QUFBQSxVQUNJLFFBREosV0FDSSxRQURKO0FBQUEsVUFDYyxNQURkLFdBQ2MsTUFEZDs7QUFFWCxVQUFHLENBQUMsT0FBTyxJQUFYLEVBQWlCO0FBQ2pCLFVBQUcsT0FBTyxJQUFWLEVBQWdCO0FBQ2QsaUJBQVMsTUFBVCxHQUFrQixDQUFDLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FBbkI7QUFDQSxpQkFBUyxFQUFULEdBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxLQUFMLENBQVcsS0FBdEIsQ0FBZDtBQUNEO0FBQ0QsV0FBSyxRQUFMLENBQWM7QUFDWixlQUFPLEtBQUssUUFBTDtBQURLLE9BQWQ7QUFHRDs7OzRCQUVPLEssRUFBTztBQUFBLG9CQUNnQixLQUFLLEtBRHJCO0FBQUEsVUFDTCxNQURLLFdBQ0wsTUFESztBQUFBLFVBQ0csUUFESCxXQUNHLFFBREg7O0FBRWIsVUFBRyxDQUFDLE9BQU8sSUFBWCxFQUFpQjtBQUNqQixVQUFJLFFBQVEsT0FBTyxNQUFNLE1BQU4sQ0FBYSxZQUFiLENBQTBCLFlBQTFCLENBQVAsQ0FBWjtBQUNBLFVBQUksY0FBSjtBQUNBLFVBQUcsT0FBTyxJQUFWLEVBQWdCO0FBQ2QsWUFBTSxXQUFXLEtBQUssWUFBTCxDQUFrQixLQUFsQixFQUF5QixPQUFPLElBQWhDLENBQWpCO0FBQ0EsaUJBQVMsTUFBVCxHQUFrQixRQUFsQjtBQUNBLFlBQUcsUUFBSCxFQUFhLFFBQVEsUUFBUSxDQUFoQjtBQUNiLGdCQUFRLFdBQVcsS0FBWCxHQUFtQixRQUFRLEVBQW5DO0FBQ0EsaUJBQVMsRUFBVCxHQUFjLEtBQWQ7QUFDRCxPQU5ELE1BTU87QUFDTCxnQkFBUSxRQUFRLFFBQVEsQ0FBeEI7QUFDRDtBQUNELFdBQUssUUFBTCxDQUFjO0FBQ1osZUFBTyxLQURLO0FBRVosZUFBTyxLQUFLLFFBQUwsQ0FBYyxLQUFkO0FBRkssT0FBZDtBQUlBLFdBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBcEI7QUFDRDs7O2lEQUU0QjtBQUFBLG9CQUNJLEtBQUssS0FEVDtBQUFBLFVBQ25CLE1BRG1CLFdBQ25CLE1BRG1CO0FBQUEsVUFDWCxVQURXLFdBQ1gsVUFEVzs7QUFFM0IsYUFDRSx5Q0FBTyx5QkFBeUI7QUFDOUIsa0JBQVEsa0JBQWtCLE9BQU8sTUFBekIsRUFBaUMsVUFBakM7QUFEc0IsU0FBaEMsR0FERjtBQUtEOzs7a0NBRWE7QUFBQTs7QUFBQSxvQkFDNEIsS0FBSyxLQURqQztBQUFBLFVBQ0osUUFESSxXQUNKLFFBREk7QUFBQSxVQUNNLEtBRE4sV0FDTSxLQUROO0FBQUEsVUFDYSxVQURiLFdBQ2EsVUFEYjtBQUFBLDBCQUVpQyxLQUFLLEtBQUwsQ0FBVyxNQUY1QztBQUFBLFVBRUosTUFGSSxpQkFFSixNQUZJO0FBQUEsVUFFSSxNQUZKLGlCQUVJLE1BRko7QUFBQSxVQUVZLElBRlosaUJBRVksSUFGWjtBQUFBLFVBRWtCLElBRmxCLGlCQUVrQixJQUZsQjtBQUFBLFVBRXdCLElBRnhCLGlCQUV3QixJQUZ4Qjs7QUFHWixhQUFPLE1BQU0sR0FBTixDQUFVLFVBQUMsSUFBRCxFQUFPLENBQVAsRUFBYTtBQUM1QixZQUFJLFlBQVksRUFBaEI7QUFDQSxZQUFHLFFBQVEsQ0FBQyxTQUFTLE1BQWxCLElBQTRCLFNBQVMsRUFBVCxLQUFnQixDQUEvQyxFQUFrRDtBQUNoRCx1Q0FBMkIsVUFBM0I7QUFDRDtBQUNELFlBQU0sUUFBUSxzQkFBYyxFQUFkLEVBQWtCLGFBQWxCLEVBQWlDO0FBQzdDLGlCQUFVLEtBQUssTUFBTCxHQUFjLE1BQWQsR0FBdUIsTUFEWTtBQUU3QyxvQkFBYSxJQUFiO0FBRjZDLFNBQWpDLENBQWQ7QUFJQSxlQUNFO0FBQUE7VUFBQTtBQUNFLHVCQUFXLFNBRGI7QUFFRSxtQkFBTyxLQUZUO0FBR0UsaUJBQUssQ0FIUDtBQUlFLDBCQUFZLENBSmQ7QUFLRSw0QkFBYyxJQUxoQjtBQU1FLHlCQUFhLE9BQUssU0FBTCxDQUFlLElBQWYsUUFOZjtBQU9FLHlCQUFhLE9BQUssU0FBTCxDQUFlLElBQWYsUUFQZjtBQVFFLDBCQUFjLE9BQUssVUFBTCxDQUFnQixJQUFoQixRQVJoQjtBQVNFLHFCQUFTLE9BQUssT0FBTCxDQUFhLElBQWIsUUFUWDtVQVVHO0FBVkgsU0FERjtBQWNELE9BdkJNLENBQVA7QUF3QkQ7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtRQUFBLEVBQUssT0FBTyxZQUFaO1FBQ0csS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixJQUFsQixHQUNELEtBQUssMEJBQUwsRUFEQyxHQUNtQyxFQUZ0QztRQUdHLEtBQUssV0FBTDtBQUhILE9BREY7QUFPRDs7Ozs7QUFJSCxXQUFXLFNBQVgsR0FBdUI7QUFDckIsUUFBTSxpQkFBVSxJQURLO0FBRXJCLFFBQU0saUJBQVUsSUFGSztBQUdyQixTQUFPLGlCQUFVLE1BSEk7QUFJckIsU0FBTyxpQkFBVSxNQUpJO0FBS3JCLFFBQU0saUJBQVUsTUFMSztBQU1yQixRQUFNLGlCQUFVLE1BTks7QUFPckIsVUFBUSxpQkFBVSxNQVBHO0FBUXJCLFVBQVEsaUJBQVU7QUFSRyxDQUF2Qjs7a0JBV2UsVSIsImZpbGUiOiJyZWFjdC1zdGFycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBwYXJlbnRTdHlsZXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbn1cblxuY29uc3QgZGVmYXVsdFN0eWxlcyA9IHtcbiAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgY3Vyc29yOiAgICdwb2ludGVyJyxcbiAgZGlzcGxheTogICdibG9jaycsXG4gIGZsb2F0OiAgICAnbGVmdCdcbn1cblxuY29uc3QgZ2V0SGFsZlN0YXJTdHlsZXMgPSAoY29sb3IsIHVuaXF1ZW5lc3MpID0+IHtcbiAgcmV0dXJuIGBcbiAgICAucmVhY3Qtc3RhcnMtJHt1bmlxdWVuZXNzfTpiZWZvcmUge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgei1pbmRleDogMTtcbiAgICAgIHRvcDogMDsgbGVmdDogMDtcbiAgICAgIHdpZHRoOiA1MCU7XG4gICAgICBjb250ZW50OiBhdHRyKGRhdGEtZm9yaGFsZik7XG4gICAgICBjb2xvcjogJHtjb2xvcn07XG4gIH1gXG59XG5cbmNsYXNzIFJlYWN0U3RhcnMgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cbiAgICBzdXBlcihwcm9wcylcblxuICAgIC8vIHNldCBkZWZhdWx0c1xuXG4gICAgcHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCBwcm9wcylcblxuICAgIGlmKHR5cGVvZiBwcm9wcy5lZGl0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcHJvcHMuZWRpdCA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvcHMuZWRpdCA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYodHlwZW9mIHByb3BzLmhhbGYgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBwcm9wcy5oYWxmID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wcy5oYWxmID0gZmFsc2VcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdW5pcXVlbmVzczogKE1hdGgucmFuZG9tKCkgKyAnJykucmVwbGFjZSgnLicsICcnKSxcbiAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSB8fCAwLFxuICAgICAgc3RhcnM6IFtdLFxuICAgICAgaGFsZlN0YXI6IHtcbiAgICAgICAgYXQ6IE1hdGguZmxvb3IocHJvcHMudmFsdWUpLFxuICAgICAgICBoaWRkZW46IHByb3BzLmhhbGYgJiYgcHJvcHMudmFsdWUgJSAxIDwgMC41XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZS5jb25maWcgPSB7XG4gICAgICBjb3VudDogIHByb3BzLmNvdW50IHx8IDUsXG4gICAgICBzaXplOiAgIHByb3BzLnNpemUgfHwgMTUsXG4gICAgICBjaGFyOiAgIHByb3BzLmNoYXIgfHwgJ+KYhScsXG4gICAgICAvLyBkZWZhdWx0IGNvbG9yIG9mIGluYWN0aXZlIHN0YXJcbiAgICAgIGNvbG9yMTogcHJvcHMuY29sb3IxIHx8ICdncmF5JyxcbiAgICAgIC8vIGNvbG9yIG9mIGFuIGFjdGl2ZSBzdGFyXG4gICAgICBjb2xvcjI6IHByb3BzLmNvbG9yMiB8fCAnI2ZmZDcwMCcsXG4gICAgICBoYWxmOiAgIHByb3BzLmhhbGYsXG4gICAgICBlZGl0OiAgIHByb3BzLmVkaXQsXG4gICAgfVxuXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN0YXJzOiB0aGlzLmdldFN0YXJzKHRoaXMuc3RhdGUudmFsdWUpXG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN0YXJzOiB0aGlzLmdldFN0YXJzKHByb3BzLnZhbHVlKSxcbiAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSxcbiAgICAgIGhhbGZTdGFyOiB7XG4gICAgICAgIGF0OiBNYXRoLmZsb29yKHByb3BzLnZhbHVlKSxcbiAgICAgICAgaGlkZGVuOiB0aGlzLnN0YXRlLmNvbmZpZy5oYWxmICYmIHByb3BzLnZhbHVlICUgMSA8IDAuNVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpc0RlY2ltYWwodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJSAxICE9PSAwXG4gIH1cblxuICBnZXRSYXRlKCkge1xuICAgIGxldCBzdGFyc1xuICAgIGlmKHRoaXMuc3RhdGUuY29uZmlnLmhhbGYpIHtcbiAgICAgIHN0YXJzID0gTWF0aC5mbG9vcih0aGlzLnN0YXRlLnZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGFycyA9IE1hdGgucm91bmQodGhpcy5zdGF0ZS52YWx1ZSlcbiAgICB9XG4gICAgcmV0dXJuIHN0YXJzXG4gIH1cblxuICBnZXRTdGFycyhhY3RpdmVDb3VudCkge1xuICAgIGlmKHR5cGVvZiBhY3RpdmVDb3VudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGFjdGl2ZUNvdW50ID0gdGhpcy5nZXRSYXRlKClcbiAgICB9XG4gICAgbGV0IHN0YXJzID0gW11cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5jb25maWcuY291bnQ7IGkrKykge1xuICAgICAgc3RhcnMucHVzaCh7XG4gICAgICAgIGFjdGl2ZTogaSA8PSBhY3RpdmVDb3VudCAtIDFcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBzdGFyc1xuICB9XG5cbiAgbW91c2VPdmVyKGV2ZW50KSB7XG4gICAgbGV0IHsgY29uZmlnLCBoYWxmU3RhciB9ID0gdGhpcy5zdGF0ZVxuICAgIGlmKCFjb25maWcuZWRpdCkgcmV0dXJuO1xuICAgIGxldCBpbmRleCA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpXG4gICAgaWYoY29uZmlnLmhhbGYpIHtcbiAgICAgIGNvbnN0IGlzQXRIYWxmID0gdGhpcy5tb3JlVGhhbkhhbGYoZXZlbnQsIGNvbmZpZy5zaXplKVxuICAgICAgaGFsZlN0YXIuaGlkZGVuID0gaXNBdEhhbGZcbiAgICAgIGlmKGlzQXRIYWxmKSBpbmRleCA9IGluZGV4ICsgMVxuICAgICAgaGFsZlN0YXIuYXQgPSBpbmRleFxuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCA9IGluZGV4ICsgMVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN0YXJzOiB0aGlzLmdldFN0YXJzKGluZGV4KVxuICAgIH0pXG4gIH1cblxuICBtb3JlVGhhbkhhbGYoZXZlbnQsIHNpemUpIHtcbiAgICBsZXQgeyB0YXJnZXQgfSA9IGV2ZW50XG4gICAgdmFyIG1vdXNlQXQgPSBldmVudC5jbGllbnRYIC0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICBtb3VzZUF0ID0gTWF0aC5yb3VuZChNYXRoLmFicyhtb3VzZUF0KSlcbiAgICByZXR1cm4gbW91c2VBdCA+IHNpemUgLyAyXG4gIH1cblxuICBtb3VzZUxlYXZlKCkge1xuICAgIGNvbnN0IHsgdmFsdWUsIGhhbGZTdGFyLCBjb25maWcgfSA9IHRoaXMuc3RhdGVcbiAgICBpZighY29uZmlnLmVkaXQpIHJldHVyblxuICAgIGlmKGNvbmZpZy5oYWxmKSB7XG4gICAgICBoYWxmU3Rhci5oaWRkZW4gPSAhdGhpcy5pc0RlY2ltYWwodmFsdWUpXG4gICAgICBoYWxmU3Rhci5hdCA9IE1hdGguZmxvb3IodGhpcy5zdGF0ZS52YWx1ZSlcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdGFyczogdGhpcy5nZXRTdGFycygpXG4gICAgfSlcbiAgfVxuXG4gIGNsaWNrZWQoZXZlbnQpIHtcbiAgICBjb25zdCB7IGNvbmZpZywgaGFsZlN0YXIgfSA9IHRoaXMuc3RhdGVcbiAgICBpZighY29uZmlnLmVkaXQpIHJldHVyblxuICAgIGxldCBpbmRleCA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpXG4gICAgbGV0IHZhbHVlXG4gICAgaWYoY29uZmlnLmhhbGYpIHtcbiAgICAgIGNvbnN0IGlzQXRIYWxmID0gdGhpcy5tb3JlVGhhbkhhbGYoZXZlbnQsIGNvbmZpZy5zaXplKVxuICAgICAgaGFsZlN0YXIuaGlkZGVuID0gaXNBdEhhbGZcbiAgICAgIGlmKGlzQXRIYWxmKSBpbmRleCA9IGluZGV4ICsgMVxuICAgICAgdmFsdWUgPSBpc0F0SGFsZiA/IGluZGV4IDogaW5kZXggKyAuNVxuICAgICAgaGFsZlN0YXIuYXQgPSBpbmRleFxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IGluZGV4ID0gaW5kZXggKyAxXG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgc3RhcnM6IHRoaXMuZ2V0U3RhcnMoaW5kZXgpXG4gICAgfSlcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHZhbHVlKVxuICB9XG5cbiAgcmVuZGVySGFsZlN0YXJTdHlsZUVsZW1lbnQoKSB7XG4gICAgY29uc3QgeyBjb25maWcsIHVuaXF1ZW5lc3MgfSA9IHRoaXMuc3RhdGVcbiAgICByZXR1cm4gKFxuICAgICAgPHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG4gICAgICAgIF9faHRtbDogZ2V0SGFsZlN0YXJTdHlsZXMoY29uZmlnLmNvbG9yMiwgdW5pcXVlbmVzcylcbiAgICAgIH19Pjwvc3R5bGU+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyU3RhcnMoKSB7XG4gICAgY29uc3QgeyBoYWxmU3Rhciwgc3RhcnMsIHVuaXF1ZW5lc3MgfSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCB7IGNvbG9yMSwgY29sb3IyLCBzaXplLCBjaGFyLCBoYWxmIH0gPSB0aGlzLnN0YXRlLmNvbmZpZ1xuICAgIHJldHVybiBzdGFycy5tYXAoKHN0YXIsIGkpID0+IHtcbiAgICAgIGxldCBzdGFyQ2xhc3MgPSAnJ1xuICAgICAgaWYoaGFsZiAmJiAhaGFsZlN0YXIuaGlkZGVuICYmIGhhbGZTdGFyLmF0ID09PSBpKSB7XG4gICAgICAgIHN0YXJDbGFzcyA9IGByZWFjdC1zdGFycy0ke3VuaXF1ZW5lc3N9YFxuICAgICAgfVxuICAgICAgY29uc3Qgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0U3R5bGVzLCB7XG4gICAgICAgIGNvbG9yOiAgICBzdGFyLmFjdGl2ZSA/IGNvbG9yMiA6IGNvbG9yMSxcbiAgICAgICAgZm9udFNpemU6IGAke3NpemV9cHhgXG4gICAgICB9KVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzc05hbWU9e3N0YXJDbGFzc31cbiAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIGRhdGEtaW5kZXg9e2l9XG4gICAgICAgICAgZGF0YS1mb3JoYWxmPXtjaGFyfVxuICAgICAgICAgIG9uTW91c2VPdmVyPXt0aGlzLm1vdXNlT3Zlci5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLm1vdXNlT3Zlci5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5tb3VzZUxlYXZlLmJpbmQodGhpcyl9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja2VkLmJpbmQodGhpcyl9PlxuICAgICAgICAgIHtjaGFyfVxuICAgICAgICA8L3NwYW4+XG4gICAgICApXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17cGFyZW50U3R5bGVzfT5cbiAgICAgICAge3RoaXMuc3RhdGUuY29uZmlnLmhhbGYgP1xuICAgICAgICB0aGlzLnJlbmRlckhhbGZTdGFyU3R5bGVFbGVtZW50KCkgOiAnJ31cbiAgICAgICAge3RoaXMucmVuZGVyU3RhcnMoKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblJlYWN0U3RhcnMucHJvcFR5cGVzID0ge1xuICBlZGl0OiBQcm9wVHlwZXMuYm9vbCxcbiAgaGFsZjogUHJvcFR5cGVzLmJvb2wsXG4gIHZhbHVlOiBQcm9wVHlwZXMubnVtYmVyLFxuICBjb3VudDogUHJvcFR5cGVzLm51bWJlcixcbiAgY2hhcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2l6ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgY29sb3IxOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjb2xvcjI6IFByb3BUeXBlcy5zdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVhY3RTdGFyc1xuIl19