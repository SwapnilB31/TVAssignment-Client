import React from 'react'
import {Select,MenuItem, InputBase, makeStyles, withStyles} from '@material-ui/core'
import {useFilter} from '../contexts/FilterProvider'
import {filterActions} from '../Stores/FiltersStore'

const useStyles =  makeStyles((theme) => ({
  root : {
    padding : "0.5rem 0.8rem",
    width : "90px",
    '&:hover' : {
      borderRadius: 4,
      borderColor : "#cacaca"
    },
  },
  selectMenu : {
    color : "#777",
    fontSize : "0.8rem",
    fontWeight : "700"
  },
}))

const CustomInputBase = withStyles((theme) => ({
  root : {

  },
  input : {
    borderRadius: 2,
    position: 'relative',
    border: '1px solid #ced4da',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus' : {
      borderRadius: 2,
      borderColor : "#cacaca"
    },
  }
}))(InputBase)

export default function CustomSelect() {

  const classes = useStyles()

  const {state,dispatch} = useFilter()
  
  return (
    <Select 
      value={state.sortBy}
      onChange={(e) => dispatch({type : filterActions.setSortBy, payload : e.target.value})}
      variant="outlined"
      classes={{ root : classes.root, selectMenu : classes.selectMenu}}
      input={<CustomInputBase/>}
    >
      <MenuItem value="Most Popular">Most Popular</MenuItem>
      <MenuItem value="Ratings">Ratings</MenuItem>
      <MenuItem value="Price">Price</MenuItem>
    </Select>
  )
}
