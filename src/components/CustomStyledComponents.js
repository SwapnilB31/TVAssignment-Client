import React from 'react';
import styled from 'styled-components'  

export const SearchFilterContainer = styled.div`
  padding: 0 0.7rem;
  @media screen and (min-width : 610px) {
    border-right: 1px solid #dadada;
  }
`

export const SpacerDiv = styled.div`
  height : 0.6rem;
  @media screen and (max-width : 600px) {
    height : 0.2rem;
  }
`

export const SpaceBWDiv = styled.div`
  display : flex;
  align-items: center;
  justify-content: space-between;
  padding : 0 1.2rem;
  padding-top: 0.45rem;
  padding-bottom: 0.6rem;
  border-bottom: none;
  @media screen and (max-width : 599px) {
    padding-top: 0.15rem;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #dadada;
  }
`

export const ResultsTextDiv = styled.div`
  display : flex;
  align-items: center;
  justify-content: flex-start;
  padding : 0 1.2rem;
  padding-top : 0.75rem;
  padding-bottom: 0.6rem;
  border-bottom: none;
  @media screen and (max-width : 599px) {
    border-bottom: 1px solid #dadada;
    padding-top : 0;
    padding-bottom: 0.3rem;
  }
`

export const RatingInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const RatingsSpan = styled.span`
  display: inline-flex;
  padding: 0.2rem 0.4rem;
  align-items: center;
  justify-content: center ;
  font-size: 0.7rem;
  border-radius: 3px;
  color : #fff;
  background-color: ${props => props.rating > 4 ? 'rgb(39,184,147)' : props.rating > 3 && props.rating <= 4 ? 'rgb(77,134,227)' : props.rating > 2 && props.rating <= 3 ? 'rgb(235,143,46)' : 'rgb(243,55,92)' };
` 

export const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding : 0.4rem 0;
`

export const PriceTagSpan = styled.div`
  color : rgb(244,134,91);
  font-size: 0.8rem;
  font-weight: 700;
`

export const LightRoseBGDiv = styled.div`
  width : 100vw;
  /*height : 40vh;*/
  background-color: rgb(255,247,244);
  margin-bottom: 0.8rem;
  padding-top : 1.5rem;
  padding-bottom: 3rem;
` 