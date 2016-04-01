# react-stars :star:
###### A simple star rating component for your React projects

![react-stars](http://i.imgur.com/VDbzbqF.gif)

### Get started quickly
```javascript
import ReactStars from 'react-stars'
import React from 'react'
import { render } from 'react-dom'

const ratingChanged = (newRating) => {
  console.log(newRating)
}

render(<ReactStars
  count={5},
  onChange={ratingChanged},
  size={24},
  color2={'#ffd700'} />,

  document.getElementById('where-to-render')
);
```
### API

This a list of props that you can pass down to the component:

| Property | Description | Default value | type |
| -------- | ----------- | ------------- | ---- |
| `count`  | How many total stars you want  | 5 | number |
| `char` | Which character you want to use as a star | ★ | string |
| `color1` | Color of inactive star (this supports any CSS valid value) | `gray` | string |
| `color2` | Color of selected or active star | `#ffd700` | string |
| `size` | Size of stars (in px) | `15px` | string |
| `edit` | Should you be able to select rating or just see rating (for reusability) | `true` | boolean |
| `half` | Should component use half stars, if not the decimal part will be dropped otherwise normal algebra rools will apply to round to half stars | `false` | boolean
| `onChange(new_rating)` | Will be invoked any time the rating is changed | `null` | function |

### Requirements

You will need to have React in your project in order to use the component, I didn't bundle React in the build, because it seemed like a crazy idea.

### Todo

* Make better docs
