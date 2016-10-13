import { SET_DATA_VIZ } from '../../actions/types'

export default function(state = {}, { type, payload }) {
  switch (type) {
  case SET_DATA_VIZ:
    return payload
  default:
    return state
  }
}