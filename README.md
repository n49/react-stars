# react-rating-stars-component :star:

##### Forked from `react-stars`: https://github.com/n49/react-stars

###### A simple star rating component for your React projects (now with half stars and custom characters)

![react-stars](http://i.imgur.com/VDbzbqF.gif)

## DEMO: https://codesandbox.io/s/elegant-mountain-w3ngk?file=/src/App.js

### Get started quickly

###### Install react-stars package with NPM:

`npm install react-rating-stars-component --save`

Then in your project include the component:

```javascript
import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";

const ratingChanged = (newRating) => {
  console.log(newRating);
};

render(
  <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />,

  document.getElementById("where-to-render")
);
```

Or use other elements as icons:

> We do not support CSS for other third party libraries like fontawesome in this case. So you must import it by urself.

![react-stars-fa](https://i.imgur.com/ko9NNRH.gif)

```javascript
import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";

const ratingChanged = (newRating) => {
  console.log(newRating);
};

render(
  <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
  />,

  document.getElementById("where-to-render")
);
```

### API

This a list of props that you can pass down to the component:

| Property               | Description                                                                                                                               | Default value | type     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| `classNames`            | Name of parent classes                                                                                                                      | `null`        | string   |
| `count`                | How many total stars you want                                                                                                             | 5             | number   |
| `value`                | Set rating value                                                                                                                          | 0             | number   |
| `char`                 | Which character you want to use as a star                                                                                                 | ★             | string   |
| `color`               | Color of inactive star (this supports any CSS valid value)                                                                                | `gray`        | string   |
| `activeColor`               | Color of selected or active star                                                                                                          | `#ffd700`     | string   |
| `size`                 | Size of stars (in px)                                                                                                                     | `15px`        | string   |
| `edit`                 | Should you be able to select rating or just see rating (for reusability)                                                                  | `true`        | boolean  |
| `isHalf`                 | Should component use half stars, if not the decimal part will be dropped otherwise normal algebra rools will apply to round to half stars | `true`        | boolean  |
| `emptyIcon`            | Use your own elements as empty icons                                                                                                      | `null`        | element  |
| `halfIcon`             | Use your own elements as half filled icons                                                                                                | `null`        | element  |
| `filledIcon`           | Use your own elements as filled icons                                                                                                     | `null`        | element  |
| `a11y`                 | Should component be accessible and controlled via keyboard (arrow keys and numbers)                                                       | `true`        | boolean  |
| `onChange(new_rating)` | Will be invoked any time the rating is changed                                                                                            | `null`        | function |

### Help improve the component

###### Build on your machine:

```bash
# Clone the repo
git clone git@github.com:ertanhasani/react-stars.git
# Go into project folder
cd react-stars
# Install dependancies
npm install
```

Build the component:

```bash
npm build
```

Run the examples (dev):

```bash
npm run dev-example
```

Build the examples (production):

```bash
npm run build-example
```

Then in your browser go to: [http://127.0.0.1:8080/example](http://127.0.0.1:8080/example)

### Requirements

You will need to have React in your project in order to use the component, I didn't bundle React in the build, because it seemed like a crazy idea.

### Todo

- Make better docs
- Better state management
- Write tests