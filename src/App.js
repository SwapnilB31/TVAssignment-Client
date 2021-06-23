import React, {useState, useEffect} from 'react';
import {
  makeStyles, 
  Grid,  
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import OptionsList from './components/OptionsList';
import {SpaceBWDiv, ResultsTextDiv,LightRoseBGDiv,SpacerDiv} from './components/CustomStyledComponents';
import FiltersChipBoard from './components/FiltersChipBoard';
import SortingOptions from './components/SortingOptions';
import FreqOrderCarousel from './components/FreqOrderCarousel';
import './App.css';
import RestaurantList from './components/RestaurantList';
import {useFilter} from './contexts/FilterProvider'
import {filterActions} from './Stores/FiltersStore'


const useStyles = makeStyles((theme) => ({
  root : {
    flexGrow: 1
  },
  tall : {  
    padding : theme.spacing(0.5),
    margin : "0.3rem",
    height : "30vh",
  },
  mt : {
    marginTop :'0.3rem'
  },
  paper : {
    padding : theme.spacing(1),
  },
  mutedText : {
    color : "#999",
    textTransform : "none",
    fontSize : "0.7rem"
  },
  containerWithBorderBtm : {
    borderBottom : "none",
    [theme.breakpoints.up("sm")] : {
      borderBottom : "1px solid #dadada"
    }
  }
}))

function App() {

  const styles = useStyles();

  const [isMobile,setIsMobile] = useState(false)
  const {state,dispatch} = useFilter()

  const handleResize = () => {
    const width = window.innerWidth;
    console.log()
    if(width > 599)
      setIsMobile(false)
    else
      setIsMobile(true)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize',handleResize)

    return () => {
      window.removeEventListener('resize',handleResize)
    }
  },[])

  return (
    <>
      <LightRoseBGDiv>
        <Container maxWidth="lg">
          <Grid container spacing={1}> 
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>MOST FREQUENTLY ORDERED</Typography>
            </Grid>
          </Grid>
          <SpacerDiv/>
          <FreqOrderCarousel/>
        </Container>
      </LightRoseBGDiv>
      <Container maxWidth="lg">
        <Grid container spacing={1} classes={{root : styles.containerWithBorderBtm}}>
          <Grid item xs={12} sm={5} md={3}>
            <SpaceBWDiv>
                <Typography variant="subtitle2">FILTERS</Typography>
                <Button 
                  variant="text" 
                  color="primary" 
                  classes={{textPrimary : styles.mutedText}}
                  onClick={() => {dispatch({type : filterActions.resetAll})}}
                >
                  Reset All
                </Button>
            </SpaceBWDiv>
          </Grid>
          {!isMobile && <Grid item xs={12} sm={7} md={9}>
            <ResultsTextDiv>
              <Typography variant="subtitle2">RESULTS {!state.restListLoading && `(${state.restList.length})`}</Typography>
            </ResultsTextDiv>
          </Grid>}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={3}>
            <OptionsList/>
          </Grid>
          {isMobile && <Grid item xs={12} sm={8} md={9}>
            <ResultsTextDiv>
              <Typography variant="subtitle2">RESULTS {!state.restListLoading && `(${state.restList.length})`}</Typography>
            </ResultsTextDiv>
          </Grid>}
          <Grid item xs={12} sm={7} md={9} className={styles.mt}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8}>
                  <FiltersChipBoard/>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <SortingOptions/>
              </Grid>
              <RestaurantList/> 
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
