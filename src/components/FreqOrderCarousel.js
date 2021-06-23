import React, {useState, useEffect} from 'react'
import {v4 as uuid} from 'uuid'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"
import FreqRestaurantCard from './FreqRestaurantCard';
import {makeStyles,Button,CircularProgress} from '@material-ui/core';
import {ArrowBackIos,ArrowForwardIos} from '@material-ui/icons'
import restaurantList from '../data/restaurantList';
import { useFilter } from '../contexts/FilterProvider'
import { filterActions } from '../Stores/FiltersStore'
import styled from 'styled-components'

const Container = styled.div`
  height : 295px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #eaeaea;
`

const MutedText = styled.div`
  font-size: 0.9rem;
  color : #999;
`


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1250},
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  smallerDesktop: {
    breakpoint: { max: 1250, min: 970 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet : {
    breakpoint: { max: 970, min: 630 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 670, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const useStyles = makeStyles((theme) => ({
  arrowRightBody : {
    position: "absolute",
    right : 11,
    cursor : "pointer",
    all : "unset",
    backgroundColor : "#fff",
    width : "2.5rem",
    height : "2.5rem",
    display: "inline-flex",
    justifyContent : "center",
    alignItems : "center",
    border: "1px solid rgb(255,184,157)",
    borderRadius : "50%",
    color : "rgb(255,184,157)",
    zIndex : 100,
    transition: theme.transitions.create(["background-color","color"]),
    '&:hover' : {
      border: "1px solid rgb(255,129,81)",
      color : "rgb(255,129,81)",
      backgroundColor : "rgb(255,247,244)"
    },
    '&:active' : {
      border: "1px solid rgb(255,129,81)",
      color : "rgb(255,129,81)",
      backgroundColor : "rgb(255,247,244)"
    }
  },
  arrowLeftBody : {
    position: "absolute",
    left : 0,
    cursor : "pointer",
    all : "unset",
    backgroundColor : "#fff",
    width : "2.5rem",
    height : "2.5rem",
    display: "inline-flex",
    justifyContent : "center",
    alignItems : "center",
    border: "1px solid rgb(255,184,157)",
    borderRadius : "50%",
    color : "rgb(255,184,157)",
    zIndex : 100,
    transition: theme.transitions.create(["background-color","color"]),
    '&:hover' : {
      border: "1px solid rgb(255,129,81)",
      color : "rgb(255,129,81)",
      backgroundColor : "rgb(255,247,244)"
    },
    '&:active' : {
      border: "1px solid rgb(255,129,81)",
      color : "rgb(255,129,81)",
      backgroundColor : "rgb(255,247,244)"
    },
    '& > svg' : {
      position: "absolute",
      left : 12
    }
  }
}))

function CustomRightArrow({onClick, ...rest}) {
  const classes = useStyles()
  return (
    <button onClick={() => onClick()} className={classes.arrowRightBody}>
      <ArrowForwardIos/>
    </button>
  )
}

function CustomLeftArrow({onClick, ...rest}) {
  const classes = useStyles()
  return (
    <button onClick={() => onClick()} className={classes.arrowLeftBody}>
      <ArrowBackIos/>
    </button>
  )
}
 
function FreqOrderCarousel() {

  const [loading,setLoading] = useState(false)
  const [restList,setRestList] = useState([])
  const [loadError,setLoadError] = useState('')

  const fetchData = () => {
    setLoading(true)
    fetch("http://localhost:5000/getFrequentRestaurants")
    .then(res => res.json())
    .then(data => {
      setLoading(false)
      if(data.error) {
        setRestList([])
        setLoadError(data.error)
      }
      else {
        setRestList(data)
        setLoadError('')
      }
    })
    .catch(err => {
      setRestList([])
      setLoadError("Network Error! Couldn't fetch data.")
    })
  }

  useEffect(() => {
    fetchData()
  },[])

  const index = Math.floor((Math.random() * 8))
  const ribonIndex = Math.floor(Math.random() * 3)

  return (
    <>
      {loading && (
        <Container>
          <CircularProgress/>
        </Container>
      )}
      {!loading && loadError !== '' && (
        <Container>
          <MutedText>{loadError}</MutedText>
          <Button color="secondary">RELOAD</Button>
        </Container>
      )}
      {!loading && loadError === '' && (
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          infinite={true}
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          customRightArrow={<CustomRightArrow/>}
          customLeftArrow={<CustomLeftArrow/>}
        >
        {
          restList.map((val,ind) => (
              <FreqRestaurantCard data={val} key={uuid()} ind={(index+ind)%9} ribbon={ind === ribonIndex}/>
          ))
        }
        </Carousel>)
      }
    </>
  )
}

export default React.memo(() => <FreqOrderCarousel/>)