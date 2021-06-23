import React, {useReducer, useContext, createContext} from 'react'
import {filterInitState,filterReducer} from '../Stores/FiltersStore'

const FilterContext = createContext()

/**
 * @typedef {Object} FilterStore
 * @property {Object} FilterStore.state
 * @property {React.Dispatch<{type: string;key?: string;payload: any;}>} FilterStore.dispatch
 */

/**
 * 
 * @returns {Object} Store
 * @returns {Object} Store.state
 * @returns {React.Dispatch<{type: string;key?: string;payload: any;}>} Store.dispatch
 */
export function useFilter() {
  return useContext(FilterContext)
}

export default function FilterProvider({children}) {

  const [state,dispatch] = useReducer(filterReducer,filterInitState)

  const value = {state,dispatch}

  return (
    <FilterContext.Provider value={value}>
    {
      children
    }
    </FilterContext.Provider>
  )
}
