import {
  SET_FETCH_STATE,
  SET_DATA_VIZ
} from './types'

// Action Creator for updating fetch state
export function changeFetchState(fetchState) {
  return {
    type: SET_FETCH_STATE,
    payload: fetchState
  }
}

// Action Creator for updating data visualization
export function setVizData(vizData) {
  // Thunk
  return function(dispatch) {
    // Set app state to fetching
    dispatch(changeFetchState(true))

    // Simulate load by utilizing setTimeout
    setTimeout(()=> {

      // Dispatch an event whose payload contains the new visualization data
      dispatch({
        type: SET_DATA_VIZ,
        payload: vizData
      })

      // Update app state to no longer fetching
      dispatch(changeFetchState(false))
    }, 1000)
  }
}

