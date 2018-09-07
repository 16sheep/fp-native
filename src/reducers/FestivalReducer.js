
const defaultState = {
    festivals: []
  }

export default function(state=defaultState, action){
  console.log("festivalReducer action: ", action)
  switch(action.type){
    case "GET_FESTIVALS":
      return { ...state, festivals: action.payload }
    case "NEW_FESTIVAL":
      return { ...state, festivals: action.payload }
    case "UPDATE_FESTIVAL":
      return { ...state, festivals: action.payload }
      case "DELETE_FESTIVAL":
        return { ...state, festivals: action.payload }
    default:
      return state
  }
}
