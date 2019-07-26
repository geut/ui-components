import React, { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'

const TreeContext = createContext()

const TreeContextProvider = ({ children, reducer, initialState }) => {
  const contextValue = useReducer(reducer, initialState)
  return (
    <TreeContext.Provider value={contextValue}>
      {children}
    </TreeContext.Provider>
  )
}

TreeContextProvider.defaultProps = {
  initialState: {}
}

TreeContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object
}

const useTreeContext = () => useContext(TreeContext)

export {
  TreeContextProvider, useTreeContext
}
