import { SET_FETCH_STATE } from '../../actions/types'

// App loads up with a default fetch state of false
export default function(state = false, { type, payload }) {
  switch (type) {
  case SET_FETCH_STATE:
    return payload
  default:
    return state
  }
}
