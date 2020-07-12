'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = useConfig;

var _react = require('react');

function useConfig(config) {
    var _useState = (0, _react.useState)(config.count),
        _useState2 = _slicedToArray(_useState, 2),
        count = _useState2[0],
        setCount = _useState2[1];

    var _useState3 = (0, _react.useState)(config.size),
        _useState4 = _slicedToArray(_useState3, 2),
        size = _useState4[0],
        setSize = _useState4[1];

    var _useState5 = (0, _react.useState)(config.char),
        _useState6 = _slicedToArray(_useState5, 2),
        char = _useState6[0],
        setChar = _useState6[1];

    var _useState7 = (0, _react.useState)(config.color),
        _useState8 = _slicedToArray(_useState7, 2),
        color = _useState8[0],
        setColor = _useState8[1];

    var _useState9 = (0, _react.useState)(config.activeColor),
        _useState10 = _slicedToArray(_useState9, 2),
        activeColor = _useState10[0],
        setActiveColor = _useState10[1];

    var _useState11 = (0, _react.useState)(config.isHalf),
        _useState12 = _slicedToArray(_useState11, 2),
        isHalf = _useState12[0],
        setIsHalf = _useState12[1];

    var _useState13 = (0, _react.useState)(config.edit),
        _useState14 = _slicedToArray(_useState13, 2),
        edit = _useState14[0],
        setEdit = _useState14[1];

    var _useState15 = (0, _react.useState)(config.emptyIcon),
        _useState16 = _slicedToArray(_useState15, 2),
        emptyIcon = _useState16[0],
        setEmptyIcon = _useState16[1];

    var _useState17 = (0, _react.useState)(config.halfIcon),
        _useState18 = _slicedToArray(_useState17, 2),
        halfIcon = _useState18[0],
        setHalfIcon = _useState18[1];

    var _useState19 = (0, _react.useState)(config.filledIcon),
        _useState20 = _slicedToArray(_useState19, 2),
        filledIcon = _useState20[0],
        setFilledIcon = _useState20[1];

    var _useState21 = (0, _react.useState)(config.a11y),
        _useState22 = _slicedToArray(_useState21, 2),
        a11y = _useState22[0],
        setA11y = _useState22[1];

    var configObj = {
        count: count,
        size: size,
        char: char,
        color: color,
        activeColor: activeColor,
        isHalf: isHalf,
        edit: edit,
        emptyIcon: emptyIcon,
        halfIcon: halfIcon,
        filledIcon: filledIcon,
        a11y: a11y
    };

    function setConfig(config) {
        setCount(config.count);
        setSize(config.size);
        setChar(config.char);
        setColor(config.color);
        setActiveColor(config.activeColor);
        setIsHalf(config.isHalf);
        setEdit(config.edit);
        setEmptyIcon(config.emptyIcon);
        setHalfIcon(config.halfIcon);
        setFilledIcon(config.filledIcon);
        setA11y(config.a11y);
    }

    return [configObj, setConfig];
}