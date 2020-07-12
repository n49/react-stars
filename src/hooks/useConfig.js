import { useState } from 'react';

export default function useConfig(config) {
    const [count, setCount] = useState(config.count);
    const [size, setSize] = useState(config.size);
    const [char, setChar] = useState(config.char);
    const [color, setColor] = useState(config.color);
    const [activeColor, setActiveColor] = useState(config.activeColor);
    const [isHalf, setIsHalf] = useState(config.isHalf);
    const [edit, setEdit] = useState(config.edit);
    const [emptyIcon, setEmptyIcon] = useState(config.emptyIcon);
    const [halfIcon, setHalfIcon] = useState(config.halfIcon);
    const [filledIcon, setFilledIcon] = useState(config.filledIcon);
    const [a11y, setA11y] = useState(config.a11y);

    const configObj = {
        count,
        size,
        char,
        color,
        activeColor,
        isHalf,
        edit,
        emptyIcon,
        halfIcon,
        filledIcon,
        a11y
    }

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

    return [
        configObj,
        setConfig
    ]
}