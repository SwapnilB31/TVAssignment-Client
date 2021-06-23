import React from 'react'
import {withStyles,Slider,} from '@material-ui/core'

const CustomSlider = withStyles({
  root: {
    color: 'rgb(242,106,54)',
    height: 3,
  },
  thumb : {
    height: 20,
    width: 20,
    backgroundColor : "white",
    border : "1px solid currentcolor",
    marginTop: -10,
    marginLeft: -12,
  },
  valueLabel : {
    left : "-45%",
    fontSize: "10px"
  },
  rail : {
    height : 3
  },
  track : {
    height : 3
  }
})(Slider);

export default function PriceSlider(props) {
  return (
    <CustomSlider {...props}/>
  )
}
