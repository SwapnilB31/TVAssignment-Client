import React from "react";

export const filterActions = Object.freeze({
  setFormatChecked : "setFormatValue",
  setOccasionChecked : "setOccasionChecked",
  setPriceRange : "setPriceRange",
  setSortBy : "setSortBy",
  setRestListLoading : "setRestListLoading",
  setRestList : "setRestList",
  resetAll : "resetAll",
})

/**
 * 
 * @param {Object} state
 * @param {Object} state.format
 * @param {Object} state.occasion 
 * @param {[Number,Number]} state.priceRange
 * @param {String} state.sortBy
 * @param {boolean} state.restListLoading
 * @param {any[]} state.restList
 * @param {String} state.sortBy
 * @param {Object} action
 * @param {String} action.type
 * @param {String=} action.key
 * @param {any} action.payload 
 */
export function filterReducer(state,action) {
  switch(action.type) {
    case filterActions.setFormatChecked:
      return {...state, format : {...state.format, [action.key] : action.payload}}
    case filterActions.setOccasionChecked:
      return {...state, occasion : {...state.occasion, [action.key] : action.payload}}
    case filterActions.setPriceRange:
      return {...state, priceRange : action.payload}
    case filterActions.setSortBy:
      return {...state, sortBy : action.payload}
    case filterActions.setRestListLoading:
      return {...state, restListLoading : action.payload}
    case filterActions.setRestList:
      return {...state, restList : action.payload}
    case filterActions.resetAll: {
      return {...state, format : filterInitState.format, occasion : filterInitState.occasion, priceRange : filterInitState.priceRange, sortBy : filterInitState.sortBy}
    }
    default:
      return state
  }
}

export const filterInitState = Object.freeze({
  format : {
    "Buffet" : false,
    "Lunch Box" : false,
    "Snack Box" : false,
    "Food Truck" : false,
    "Pop-Up" : false,
    "Mini Buffet" : false,
    "Live Counter" : false
  },
  occasion : {
    "Birthday" : false,
    "Baby Shower" : false,
    "House Warming" : false,
    "House Party" : false,
    "Society Event" : false
  },
  priceRange : [3.33,16.67],
  sortBy : "Most Popular",
  restListLoading : false,
  restList : [],
})

