'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _useConfig3 = require('./hooks/useConfig');

var _useConfig4 = _interopRequireDefault(_useConfig3);

var _star = require('./star');

var _star2 = _interopRequireDefault(_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parentStyles = {
    overflow: "hidden",
    position: "relative"
};

function getHalfStarStyles(color, uniqueness) {
    return '\n    .react-stars-' + uniqueness + ':before {\n      position: absolute;\n      overflow: hidden;\n      display: block;\n      z-index: 1;\n      top: 0; left: 0;\n      width: 50%;\n      content: attr(data-forhalf);\n      color: ' + color + ';\n  }';
}

function getHalfStarStyleForIcons(color) {
    return '\n          span.react-stars-half > * {\n          color: ' + color + ';\n      }';
};

function ReactStars(props) {
    var _useState = (0, _react.useState)(''),
        _useState2 = _slicedToArray(_useState, 2),
        uniqueness = _useState2[0],
        setUniqueness = _useState2[1];

    var _useState3 = (0, _react.useState)(0),
        _useState4 = _slicedToArray(_useState3, 2),
        currentValue = _useState4[0],
        setCurrentValue = _useState4[1];

    var _useState5 = (0, _react.useState)([]),
        _useState6 = _slicedToArray(_useState5, 2),
        stars = _useState6[0],
        setStars = _useState6[1];

    var _useState7 = (0, _react.useState)(false),
        _useState8 = _slicedToArray(_useState7, 2),
        isUsingIcons = _useState8[0],
        setIsUsingIcons = _useState8[1];

    var _useConfig = (0, _useConfig4.default)(props),
        _useConfig2 = _slicedToArray(_useConfig, 2),
        config = _useConfig2[0],
        setConfig = _useConfig2[1];

    var _useState9 = (0, _react.useState)(0),
        _useState10 = _slicedToArray(_useState9, 2),
        halfStarAt = _useState10[0],
        setHalfStarAt = _useState10[1];

    var _useState11 = (0, _react.useState)(false),
        _useState12 = _slicedToArray(_useState11, 2),
        halfStarHidden = _useState12[0],
        setHalfStarHidden = _useState12[1];

    var _useState13 = (0, _react.useState)(''),
        _useState14 = _slicedToArray(_useState13, 2),
        classNames = _useState14[0],
        setClassNames = _useState14[1];

    function iconsUsed(config) {
        return !config.isHalf && config.emptyIcon && config.filledIcon || config.isHalf && config.emptyIcon && config.halfIcon && config.filledIcon;
    }

    function createUniqueness() {
        setUniqueness((Math.random() + "").replace(".", ""));
    }

    (0, _react.useEffect)(function () {
        addClassNames();
        validateInitialValue(props.value, props.count);
        setStars(getStars(props.value));
        setConfig(props);
        createUniqueness();
        setIsUsingIcons(iconsUsed(props));
        setHalfStarAt(Math.floor(props.value));
        setHalfStarHidden(props.isHalf && props.value % 1 < 0.5);
    }, []);

    function validateInitialValue(value, count) {
        if (value < 0 || value > count) {
            setCurrentValue(0);
        } else {
            setCurrentValue(value);
        }
    }

    function addClassNames() {
        var reactStarsClass = 'react-stars';
        setClassNames(props.classNames + (' ' + reactStarsClass));
    }

    function isDecimal(value) {
        return value % 1 === 0;
    }

    function getRate() {
        return config.isHalf ? Math.floor(currentValue) : Math.round(currentValue);
    }

    function getStars(activeCount) {
        if (typeof activeCount === 'undefined') {
            activeCount = getRate();
        }

        var stars = [];
        for (var i = 0; i < config.count; i++) {
            stars.push({
                active: i <= activeCount - 1
            });
        }
        return stars;
    }

    function mouseOver(event) {
        if (!config.edit) return;

        var index = Number(event.currentTarget.getAttribute('data-index'));

        if (config.isHalf) {
            var isAtHalf = moreThanHalf(event);
            setHalfStarHidden(isAtHalf);
            if (isAtHalf) index += 1;
            setHalfStarAt(index);
        } else {
            index += 1;
        }

        updateStars(index);
    }

    function updateStars(index) {
        var currentActive = stars.filter(function (x) {
            return x.active;
        });
        if (index !== currentActive.length) {
            setStars(getStars(index));
        }
    }

    function moreThanHalf(event) {
        var target = event.target;

        var boundingClientRect = target.getBoundingClientRect();
        var mouseAt = event.clientX - boundingClientRect.left;
        mouseAt = Math.round(Math.abs(mouseAt));

        return mouseAt > boundingClientRect.width / 2;
    }

    function mouseLeave() {
        if (!config.edit) return;

        updateHalfStarValues(currentValue);
        setStars(getStars());
    }

    function updateHalfStarValues(value) {
        if (config.isHalf) {
            setHalfStarHidden(isDecimal(value));
            setHalfStarAt(Math.floor(value));
        }
    }

    function onClick(event) {
        if (!config.edit) return;

        var index = Number(event.currentTarget.getAttribute('data-index'));
        var value = void 0;
        if (config.isHalf) {
            var isAtHalf = moreThanHalf(event);
            setHalfStarHidden(isAtHalf);
            if (isAtHalf) index += 1;
            value = isAtHalf ? index : index + 0.5;
            setHalfStarAt(index);
        } else {
            value = index = index + 1;
        }

        currentValueUpdated(value);
    }

    function renderHalfStarStyleElement() {
        return _react2.default.createElement('style', { dangerouslySetInnerHTML: {
                __html: isUsingIcons ? getHalfStarStyleForIcons(config.activeColor) : getHalfStarStyles(config.activeColor, uniqueness)
            } });
    }

    function currentValueUpdated(value) {
        if (value !== currentValue) {
            setStars(getStars(value));
            setCurrentValue(value);
            props.onChange(value);
        }
    }

    function handleKeyDown(event) {
        if (!config.a11y && !config.edit) return;

        var key = event.key;

        var value = currentValue;

        var keyNumber = Number(key); // e.g. "1" => 1, "ArrowUp" => NaN
        if (keyNumber) {
            if (Number.isInteger(keyNumber) && keyNumber > 0 && keyNumber <= config.count) {
                value = keyNumber;
            }
        } else {
            if ((key === "ArrowUp" || key === "ArrowRight") && value < config.count) {
                event.preventDefault();

                value += config.isHalf ? 0.5 : 1;
            } else if ((key === "ArrowDown" || key === "ArrowLeft") && value > 0.5) {
                event.preventDefault();
                value -= config.isHalf ? 0.5 : 1;
            }
        }

        updateHalfStarValues(value);

        currentValueUpdated(value);
    }

    function renderStars() {
        return stars.map(function (star, i) {
            return _react2.default.createElement(_star2.default, {
                key: i,
                index: i,
                active: star.active,
                config: config,
                onMouseOver: mouseOver,
                onMouseLeave: mouseLeave,
                onClick: onClick,
                halfStarHidden: halfStarHidden,
                halfStarAt: halfStarAt,
                isUsingIcons: isUsingIcons,
                uniqueness: uniqueness
            });
        });
    }

    return _react2.default.createElement(
        'div',
        { className: 'react-stars-wrapper-' + uniqueness,
            style: { display: 'flex' } },
        _react2.default.createElement(
            'div',
            { tabIndex: config.a11y && config.edit ? 0 : null,
                'aria-label': 'add rating by typing an integer from 0 to 5 or pressing arrow keys',
                onKeyDown: handleKeyDown,
                className: classNames,
                style: parentStyles },
            config.isHalf && renderHalfStarStyleElement(),
            renderStars(),
            _react2.default.createElement(
                'p',
                { style: { position: 'absolute', left: '-200rem' }, role: 'status' },
                currentValue
            )
        )
    );
}

ReactStars.propTypes = {
    classNames: _propTypes2.default.string,
    edit: _propTypes2.default.bool,
    half: _propTypes2.default.bool,
    value: _propTypes2.default.number,
    count: _propTypes2.default.number,
    char: _propTypes2.default.string,
    size: _propTypes2.default.number,
    color: _propTypes2.default.string,
    activeColor: _propTypes2.default.string,
    emptyIcon: _propTypes2.default.element,
    halfIcon: _propTypes2.default.element,
    filledIcon: _propTypes2.default.element,
    a11y: _propTypes2.default.bool
};

ReactStars.defaultProps = {
    edit: true,
    half: false,
    value: 0,
    count: 5,
    char: '★',
    size: 15,
    color: 'gray',
    activeColor: '#ffd700',
    a11y: true,

    onChange: function onChange() {}
};

exports.default = ReactStars;