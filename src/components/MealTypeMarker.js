import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  display : inline-flex;
  justify-content: center;
  align-items: center;
  width : 1rem;
  height : 1rem;
  margin : 0 0.1rem;
  background-color: #fff;
  border : ${props => props.veg ? '1px solid rgb(48,187,151)' : '1px solid rgb(253,71,71)'};
`

const Circle = styled.span`
  display: inline-flex;
  width : 0.5rem;
  height : 0.5rem;
  border-radius: 0.25rem;
  background-color: ${props => props.veg ? 'rgb(48,187,151)' : 'rgb(253,71,71)'};
`

const CenterAlignedDiv = styled.div`
  display : flex;
  align-items: center;
  justify-content: center;
`

export default function MealTypeMarker({mealType}) {
  if(mealType === "Veg")
    return (
      <Box veg>
        <Circle veg/>
      </Box>
    )
  else if(mealType === "Non-Veg")
      return (
        <Box>
          <Circle/>
        </Box>
      )
  else
        return (
          <CenterAlignedDiv>
            <Box>
              <Circle/>
            </Box>
            <Box veg>
              <Circle veg/> 
            </Box>
          </CenterAlignedDiv>
        )
}
