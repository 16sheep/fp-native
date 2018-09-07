
const defaultState = {
    areas: []
  }

export default function(state=defaultState, action){
  switch(action.type){
    case "GET_AREAS":
      return { areas:action.payload }
    case "NEW_AREA":
      return { areas:action.payload }
    case "UPDATE_AREA":
      return { areas:action.payload }
      case "DELETE_AREA":
        return { areas:action.payload }
    default:
      return state
  }
}
