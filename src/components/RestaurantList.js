import React, {useEffect, useState} from 'react'
import {Grid,CircularProgress, Button} from '@material-ui/core'
import RestaurantCard from './RestaurantCard'
import styled from 'styled-components'
import {v4 as uuid} from 'uuid'
import { useFilter } from '../contexts/FilterProvider'
import { filterActions } from '../Stores/FiltersStore'


const Container = styled.div`
  height : 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const MutedText = styled.div`
  font-size: 0.9rem;
  color : #999;
`

export default function RestaurantList() {

  const {state,dispatch} = useFilter()
  const [loadError,setLoadErr] = useState('')

  const {format,occasion,priceRange,sortBy,restList,restListLoading} = state

  const fetchData = () => {
    const formats = []
    const formatKeys = Object.keys(state.format)
    for(let key of formatKeys) {
      if(state.format[key])
        formats.push(key)
    }

    const occasions = []
    const occasionKeys = Object.keys(state.occasion)
    for(let key of occasionKeys) {
      if(state.occasion[key])
        occasions.push(key)
    }
    
    const priceRangeVal = [Math.round(priceRange[0]*30),Math.round(priceRange[1]*30)]
    dispatch({type : filterActions.setRestListLoading, payload : true})
    fetch("http://localhost:5000/searchRestaurants",{
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        formats : formats,
        occasions : occasions,
        priceRange : priceRangeVal,
        sortBy : sortBy
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        dispatch({type : filterActions.setRestListLoading, payload : false})
        dispatch({type : filterActions.setRestList, payload : []})
        setLoadErr(data.error)
      }
      else {
        setLoadErr('')
        dispatch({type : filterActions.setRestListLoading, payload : false})
        dispatch({type : filterActions.setRestList, payload : data})
      }
    })
    .catch(err => {
      dispatch({type : filterActions.setRestListLoading, payload : false})
      dispatch({type : filterActions.setRestList, payload : []})
      setLoadErr("Network Error! Couldn't fetch data.")
    })
  }

  useEffect(() => {
    fetchData()
  },[format,occasion,priceRange,sortBy])

  const index = Math.floor(Math.random() * 8)

  return (
    <>
    {restListLoading && (
      <Grid item xs={12}>
        <Container>
          <CircularProgress/>
        </Container>
      </Grid>
    )}
    {!restListLoading && loadError !== '' && (
      <Grid item xs={12}>
        <Container>
          <MutedText>
            {loadError}
          </MutedText>
          <Button color="secondary" onClick={() => fetchData()}>RELOAD</Button>
        </Container>
      </Grid>
    )
    }
    {!restListLoading && loadError === '' &&  restList.length == 0 && (
      <Grid item xs={12}>
        <Container>
          <MutedText>No Restaurants Match the selected fiters</MutedText>
        </Container>
      </Grid>
    )}
    {!restListLoading && loadError === '' &&  restList.length > 0 && (
        restList.map((val,ind) => (
          <Grid item sm={12} md={6} lg={4} key={uuid()}>
            <RestaurantCard data={val} ind={(ind+index) % 9}/>
          </Grid>
        )))
      }
    </>
  )
}

