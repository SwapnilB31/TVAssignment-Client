import React from 'react'
import {Chip,makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root : {
    borderRadius : "2px",
    backgroundColor : "#f3f3f3",
    transitionDuration : "0.12s",
    border : "1px solid #eaeaea",
    paddingLeft : "0.2rem",
    paddingRight : "0.2rem",
    cursor : "pointer",
    '&:hover' : {
      backgroundColor : "#fff",
      border : "1px solid #cacaca",
      boxShadow : "1px 1px 8px 1px rgba(0,0,0,0.25)"
    }
  },
  label : {
    color : "#929292",
    fontWeight : "500"
  },
  chip : {
    margin : theme.spacing(0.65)
  },
}))

function FilterChip(props) {

  const classes = useStyles()

  return (
    <Chip
      classes={{root : classes.root, label : classes.label}}
      className={classes.chip}
      {...props}
    />
  )
}

export default React.memo(props => <FilterChip {...props}/>)
