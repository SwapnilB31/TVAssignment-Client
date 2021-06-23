import React from 'react'
import styled from 'styled-components'
import CustomSelect from './CustomSelect'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 0.2rem;
  @media screen and (max-width : 960px) {
   justify-content: flex-start;
   padding: 0.3rem 0.1rem;
  }
 
`

const Label = styled.span`
  color : #777;
  font-size: 0.8rem;
  font-weight: 700;
  margin-right: 0.4rem;
  white-space: nowrap;
`

export default function SortingOptions() {
  return (
    <Container>
      <Label>Sort By :</Label>
      <CustomSelect/>
    </Container>
  )
}
