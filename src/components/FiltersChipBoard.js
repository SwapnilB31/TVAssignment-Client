import React from 'react'
import styled from 'styled-components'
import FilterChip from './FilterChip'
import { useFilter } from '../contexts/FilterProvider'
import { filterActions } from '../Stores/FiltersStore'
import {v4 as uuid} from 'uuid'

const Container = styled.div`
  padding: 1rem 0.2rem;
  @media screen and (max-width : 960px) {
    padding: 0.3rem 0.1rem;
  }
`
const labelValue = (value) => value === 100 ? `any` : `₹${Math.round(value*30)}`

export default function FiltersChipBoard() {

  const {state,dispatch} = useFilter()

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

  return (
    <Container>
      <FilterChip label={`${labelValue(state.priceRange[0])} - ${labelValue(state.priceRange[1])}`}/>
      {
        formats.map(val => (
          <FilterChip label={val} key={uuid()} onDelete={() => {dispatch({type : filterActions.setFormatChecked, key : val, payload : false})}}/>
        ))
      }
      {
        occasions.map(val => (
          <FilterChip label={val} key={uuid()} onDelete={() => {dispatch({type : filterActions.setOccasionChecked, key : val, payload : false})}}/>
        ))
      }
    </Container>
  )
}
