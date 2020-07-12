import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useConfig from './hooks/useConfig';
import Star from './star';

const parentStyles = {
    overflow: "hidden",
    position: "relative",
};

function getHalfStarStyles(color, uniqueness) {
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
}

function getHalfStarStyleForIcons(color) {
    return `
          span.react-stars-half > * {
          color: ${color};
      }`;
};

function ReactStars(props) {
    const [uniqueness, setUniqueness] = useState('');
    const [currentValue, setCurrentValue] = useState(0);
    const [stars, setStars] = useState([]);
    const [isUsingIcons, setIsUsingIcons] = useState(false);
    const [config, setConfig] = useConfig(props);
    const [halfStarAt, setHalfStarAt] = useState(0);
    const [halfStarHidden, setHalfStarHidden] = useState(false);
    const [classNames, setClassNames] = useState('');

    function iconsUsed(config) {
        return (
            (!config.isHalf && config.emptyIcon && config.filledIcon)
            || (config.isHalf && config.emptyIcon && config.halfIcon && config.filledIcon)
        )
    }

    function createUniqueness() {
        setUniqueness((Math.random() + "").replace(".", ""));
    }

    useEffect(() => {
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
        }
        else {
            setCurrentValue(value);
        }
    }

    function addClassNames() {
        const reactStarsClass = 'react-stars';
        setClassNames(props.classNames + ` ${reactStarsClass}`);
    }

    function isDecimal(value) {
        return value % 1 === 0;
    }

    function getRate() {
        return config.isHalf ?
            Math.floor(currentValue) :
            Math.round(currentValue);
    }

    function getStars(activeCount) {
        if (typeof activeCount === 'undefined') {
            activeCount = getRate();
        }

        let stars = [];
        for (let i = 0; i < config.count; i++) {
            stars.push({
                active: i <= activeCount - 1
            });
        }
        return stars;
    }

    function mouseOver(event) {
        if (!config.edit) return;

        let index = Number(event.currentTarget.getAttribute('data-index'));

        if (config.isHalf) {
            const isAtHalf = moreThanHalf(event);
            setHalfStarHidden(isAtHalf);
            if (isAtHalf) index += 1;
            setHalfStarAt(index);
        }
        else {
            index += 1;
        }

        updateStars(index);
    }

    function updateStars(index) {
        var currentActive = stars.filter(x => x.active);
        if (index !== currentActive.length) {
            setStars(getStars(index));
        }
    }

    function moreThanHalf(event) {
        const { target } = event;
        const boundingClientRect = target.getBoundingClientRect();
        let mouseAt = event.clientX - boundingClientRect.left;
        mouseAt = Math.round(Math.abs(mouseAt));

        return mouseAt > boundingClientRect.width / 2
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

        let index = Number(event.currentTarget.getAttribute('data-index'));
        let value;
        if (config.isHalf) {
            const isAtHalf = moreThanHalf(event);
            setHalfStarHidden(isAtHalf);
            if (isAtHalf) index += 1;
            value = isAtHalf ? index : index + 0.5;
            setHalfStarAt(index);
        }
        else {
            value = index = index + 1;
        }

        currentValueUpdated(value);
    }

    function renderHalfStarStyleElement() {
        return <style dangerouslySetInnerHTML={{
            __html: isUsingIcons
                ? getHalfStarStyleForIcons(config.activeColor)
                : getHalfStarStyles(config.activeColor, uniqueness)
        }}>
        </style>
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

        const { key } = event;
        let value = currentValue;

        const keyNumber = Number(key); // e.g. "1" => 1, "ArrowUp" => NaN
        if (keyNumber) {
            if (
                Number.isInteger(keyNumber) &&
                keyNumber > 0 &&
                keyNumber <= config.count
            ) {
                value = keyNumber;
            }
        } else {
            if ((key === "ArrowUp" || key === "ArrowRight") && value < config.count) {
                event.preventDefault();

                value += (config.isHalf ? 0.5 : 1);
            } else if ((key === "ArrowDown" || key === "ArrowLeft") && value > 0.5) {
                event.preventDefault();
                value -= (config.isHalf ? 0.5 : 1);
            }
        }

        updateHalfStarValues(value);

        currentValueUpdated(value);
    }

    function renderStars() {
        return stars.map((star, i) =>
            <Star
                key={i}
                index={i}
                active={star.active}
                config={config}
                onMouseOver={mouseOver}
                onMouseLeave={mouseLeave}
                onClick={onClick}
                halfStarHidden={halfStarHidden}
                halfStarAt={halfStarAt}
                isUsingIcons={isUsingIcons}
                uniqueness={uniqueness}
            />
        );
    }

    return <div className={`react-stars-wrapper-${uniqueness}`}
        style={{ display: 'flex' }}>
        <div tabIndex={config.a11y && config.edit ? 0 : null}
            aria-label='add rating by typing an integer from 0 to 5 or pressing arrow keys'
            onKeyDown={handleKeyDown}
            className={classNames}
            style={parentStyles} >
            {config.isHalf && renderHalfStarStyleElement()}
            {renderStars()}
            <p style={{ position: 'absolute', left: '-200rem' }} role='status'>
                {currentValue}
            </p>
        </div>
    </div>
}

ReactStars.propTypes = {
    classNames: PropTypes.string,
    edit: PropTypes.bool,
    half: PropTypes.bool,
    value: PropTypes.number,
    count: PropTypes.number,
    char: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    activeColor: PropTypes.string,
    emptyIcon: PropTypes.element,
    halfIcon: PropTypes.element,
    filledIcon: PropTypes.element,
    a11y: PropTypes.bool
}

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

    onChange: () => { }
};

export default ReactStars;