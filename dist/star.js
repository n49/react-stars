"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Star;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyles = {
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    display: "block",
    float: "left"
};

function Star(props) {
    var index = props.index,
        active = props.active,
        config = props.config,
        onMouseOver = props.onMouseOver,
        onMouseLeave = props.onMouseLeave,
        onClick = props.onClick,
        halfStarHidden = props.halfStarHidden,
        halfStarAt = props.halfStarAt,
        isUsingIcons = props.isUsingIcons,
        uniqueness = props.uniqueness;
    var color = config.color,
        activeColor = config.activeColor,
        size = config.size,
        char = config.char,
        isHalf = config.isHalf,
        edit = config.edit,
        halfIcon = config.halfIcon,
        emptyIcon = config.emptyIcon,
        filledIcon = config.filledIcon;


    var starClass = '';
    var half = false;

    if (isHalf && !halfStarHidden && halfStarAt === index) {
        if (!isUsingIcons) starClass = "react-stars-" + uniqueness;else starClass = 'react-stars-half';
        half = true;
    }

    var style = _extends({}, defaultStyles, {
        color: active ? activeColor : color,
        cursor: edit ? 'pointer' : 'default',
        fontSize: size + "px"
    });

    function renderIcon() {
        if (!isUsingIcons) {
            return char;
        } else {
            if (active) {
                return filledIcon;
            } else if (!active && half) {
                return halfIcon;
            } else {
                return emptyIcon;
            }
        }
    }

    return _react2.default.createElement(
        "span",
        {
            className: starClass,
            style: style,
            key: index,
            "data-index": index,
            "data-forhalf": filledIcon ? index : char,
            onMouseOver: onMouseOver,
            onMouseMove: onMouseOver,
            onMouseLeave: onMouseLeave,
            onClick: onClick },
        renderIcon()
    );
}