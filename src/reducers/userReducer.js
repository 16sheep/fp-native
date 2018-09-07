
const defaultState = {
    current_user: null
  }

export default function(state=defaultState, action){
  console.log("userReducer action: ", action)
  switch(action.type){
    case "LOG_IN":
      return { ...state, current_user: action.payload }
    case "LOG_OUT":
      localStorage.clear()
      return { ...state, current_user: null }
    case "SIGN_UP":
      return { ...state, current_user: action.payload }
    default:
      return state
  }
}
