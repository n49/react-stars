import React from 'react'
import { render } from 'react-dom'
import ReactStars from '../src/react-stars'

const firstExample = {
  size: 30,
  value: 2.5,
  edit: false
};

const secondExample = {
  size: 50,
  count: 10,
  color: "black",
  activeColor: "red",
  value: 7.5,
  a11y: true,
  isHalf: true,
  emptyIcon: <i className="far fa-star" />,
  halfIcon: <i className="fa fa-star-half-alt" />,
  filledIcon: <i className="fa fa-star" />,
  onChange: newValue => {
    console.log(`Example 2: new value is ${newValue}`);
  }
};

const thirdExample = {
  size: 40,
  count: 7,
  isHalf: false,
  value: 4,
  color: "blue",
  activeColor: "red",
  onChange: newValue => {
    console.log(`Example 3: new value is ${newValue}`);
  }
};

const fourthExample = {
  size: 60,
  isHalf: true,
  char: "",
  value: 3.5,
  onChange: newValue => {
    console.log(`Example 4: new value is ${newValue}`);
  }
};


render(
  <div>
    <h1>react-rating-stars-component</h1>
    <p><i>Star rating component for your React projects</i></p>
    <h4>Readonly rating stars</h4>
    <ReactStars {...firstExample} />
    <h4>Your own icons with half rating and a11y</h4>
    <ReactStars {...secondExample} />
    <h4>Full stars rating only, a11y and other colors</h4>
    <ReactStars {...thirdExample} />
    <h4>Char with half rating and a11y</h4>
    <ReactStars {...fourthExample} />
  </div>,
  document.getElementById('root')
)
