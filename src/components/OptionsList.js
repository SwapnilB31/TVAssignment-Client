import React, {useState, useEffect} from 'react'
import {List, ListItem,ListItemText,Collapse,makeStyles, FormGroup, Grid, Divider} from "@material-ui/core"
import {ExpandLess,ExpandMore} from "@material-ui/icons"
import PriceSlider from './PriceSlider'
import CustomCheckbox from './CustomCheckbox'
import {SearchFilterContainer} from './CustomStyledComponents'
import {filterActions} from '../Stores/FiltersStore'
import {useFilter} from '../contexts/FilterProvider'

const useStyles = makeStyles(theme => ({
  root : {
    width : "100%"
  },
  nested : {
    paddingLeft : theme.spacing(3)
  },
  sliderPadding : {
    padding : "2.5rem 0.2rem"
  },
  liTypo : {
    fontSize : "1rem",
    fontWeight : "600",
    color : "gray",
  },
  mt3 : {
    height : "0.3rem",
    [theme.breakpoints.up('sm')] : {
      height : "0.9rem"
    }
  }  
}))

const sliderLabel = (value) => `₹${value}`
const labelValue = (value) => value === 100 ? `any` : `₹${Math.round(value*30)}`


export default function OptionsList() {

  const [openFormat,setOpenFormat] = useState(false)
  const [openPrice,setOprenPrice] = useState(false)
  const [openOccasion,setOpenOccasion] = useState(false)
  
  const {state,dispatch} = useFilter()

  const classes = useStyles()

  const handleSliderChange = (event,newValue) => {
    dispatch({type : filterActions.setPriceRange, payload : newValue})
  }

  const handleResize = () => {
    const width = window.innerWidth
    if(width < 610) {
      setOpenFormat(false)
      setOprenPrice(false)
      setOpenOccasion(false);
    }
    else {
      setOpenFormat(true)
      setOprenPrice(true)
      setOpenOccasion(true);
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize',handleResize)
    return () => {
      window.removeEventListener('resize',handleResize)
    } 
  },[])

  return (
    <SearchFilterContainer>
      <List
        component="div"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <div className={classes.mt3}></div>
        <ListItem button dense onClick={() => setOpenFormat(prev => !prev)}>
          <ListItemText primary="Format" classes={{primary : classes.liTypo}}/>
          {openFormat ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={openFormat} timeout="auto">
          <FormGroup
            className={classes.nested}
          >
            <CustomCheckbox checked={state.format} type="format" dispatch={dispatch} label="Buffet" name="Buffet"/>
            <CustomCheckbox checked={state.format} type="format" dispatch={dispatch} label="Mini Buffet" name="Mini Buffet"/>
            <CustomCheckbox checked={state.format} type="format" dispatch={dispatch} label="Lunch Box" name="Lunch Box"/>
            <CustomCheckbox checked={state.format} type="format" dispatch={dispatch} label="Snack Box" name="Snack Box"/>
            <CustomCheckbox checked={state.format} type="format" dispatch={dispatch} label="Live Counter" name="Live Counter"/>
            <CustomCheckbox checked={state.format} type="format" dispatch={dispatch} label="Food Truck" name="Food Truck"/>
            <CustomCheckbox checked={state.format} type="format" dispatch={dispatch} label="Pop-Up" name="Pop-Up"/>
          </FormGroup>
        </Collapse>
        <div className={classes.mt3}></div>
        <Divider/>
        <div className={classes.mt3}></div>
        <ListItem button dense onClick={() => setOprenPrice(prev => !prev)}>
          <ListItemText classes={{primary : classes.liTypo}} primary={`Price ${labelValue(state.priceRange[0])} - ${labelValue(state.priceRange[1])}`}/>
          {openFormat ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={openPrice} timeout="auto">
          <Grid container>
          <Grid item xs={12} className={classes.sliderPadding}>
            <PriceSlider
              value={state.priceRange}
              onChange={handleSliderChange}
              valueLabelFormat={labelValue}
              getAriaValueText={sliderLabel}
              aria-labelledby="range-slider"
              steps={3.33}
              valueLabelDisplay="on"
            />
          </Grid>
          </Grid>
        </Collapse>
        {!openPrice && <div className={classes.mt3}></div> }
        <Divider/>
        <div className={classes.mt3}></div> 
        <ListItem button dense onClick={() => setOpenOccasion(prev => !prev)}>
          <ListItemText primary="Occassion" classes={{primary : classes.liTypo}}/>
          {openFormat ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={openOccasion} timeout="auto">
          <FormGroup
            className={classes.nested}
          >
            <CustomCheckbox checked={state.occasion} type="occasion"  dispatch={dispatch} label="Baby Shower" name="Baby Shower"/>
            <CustomCheckbox checked={state.occasion} type="occasion" dispatch={dispatch} label="Birthday Celebration" name="Birthday"/>
            <CustomCheckbox checked={state.occasion} type="occasion" dispatch={dispatch} label="House Warming" name="House Warming"/>
            <CustomCheckbox checked={state.occasion} type="occasion" dispatch={dispatch} label="House Party" name="House Party"/>
            <CustomCheckbox checked={state.occasion} type="occasion" dispatch={dispatch} label="Society Event" name="Society Event"/>
          </FormGroup>
        </Collapse>
      </List>
    </SearchFilterContainer>
  )
}


