import { SET_VIZ_DATA } from '../../actions/types'

export default function(state = {}, { type, payload }) {
  switch (type) {
  case SET_VIZ_DATA:
    return payload
  default:
    return state
  }
}