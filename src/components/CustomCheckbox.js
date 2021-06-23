import React  from 'react'
import {Checkbox, FormControlLabel,makeStyles,withStyles} from "@material-ui/core"
import {filterActions} from '../Stores/FiltersStore'

const OrangeCheckbox = withStyles({
  root : {
    color : "#cacaca",
    '&$checked' : {
      color : "rgb(242,106,54)"
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props}/>)

const useStyles = makeStyles((theme) => ({
  labelText : {
    fontSize : "0.9rem",
    fontWeight : "700",
    marginLeft : "0.5rem",
    color : "gray"
  },
  checkBoxDim : {
    width : "0.2rem",
    height : "0.2rem",
    marginTop : "0.3rem",
    marginBottom : "0.3rem",
    [theme.breakpoints.down("sm")] : {
      marginTop : "0.15rem",
      marginBottom : "0.15rem",
    }
  }
}))

export default function CustomCheckbox({label,checked,type,dispatch,name}) {

  const classes = useStyles()

  return (
    <FormControlLabel
      control={
        <OrangeCheckbox 
          onChange={(e) => {
              console.log(`clicked by ${e.target.name}`)
              dispatch({type : type === "format" ? filterActions.setFormatChecked : filterActions.setOccasionChecked, key : e.target.name, payload : e.target.checked})
          }}
          checked={checked[name]}
          name={name} 
          classes = {{
            root : classes.checkBoxDim
          }} 
        />
      }
      label={label}
      classes={{
        label : classes.labelText
      }}
    />
  )
}
