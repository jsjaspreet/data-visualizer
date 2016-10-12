// third party imports
import { combineReducers } from "redux"
import fetchReducer from './reducer_fetching'
import dataVizReducer from './reducer_data_viz'

// combine and export the reducers
export default combineReducers({
  isFetching: fetchReducer,
  dataViz: dataVizReducer
})
