
const defaultState = {
    events: []
  }

export default function(state=defaultState, action){
  console.log("eventReducer is called", action)
  switch(action.type){
    case "GET_EVENTS":
      return { events:action.payload }
    case "NEW_EVENT":
      return { events:action.payload }
    case "UPDATE_EVENT":
      return { events:action.payload }
      case "DELETE_EVENT":
        return { events:action.payload }
    default:
      return state
  }
}
