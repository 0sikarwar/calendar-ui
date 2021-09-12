import {
  ADD_NEW_EVENT
} from '../actions/event'

export default (state = {
  eventList:[]
}, action) => {
  console.log(state.eventList)
  switch (action.type) {
    case ADD_NEW_EVENT:
      return {
        ...state,
        eventList: [...state.eventList, action.newEvent]
      }
    default:
      return state
  }
}