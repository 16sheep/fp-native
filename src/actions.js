import { createUser, loginUser, getUserFestivals,createFestival, updateFestival, destroyFestival, createEvent, updateEvent, destroyEvent, getFestivalEvents, createArea, updateArea, destroyArea, getFestivalAreas} from './adapter/adapter.js'

//Areas//
export function getAreas(dispatch, id) {
  getFestivalAreas(id)
  .then(data => {dispatch({type: "GET_AREAS", payload: data})})
}

export function newArea(dispatch, body) {
  createArea(body)
  .then(data =>  { dispatch({type:"NEW_AREA", payload: data})})
}

export function editArea(dispatch, body) {
  updateArea(body)
  .then(data =>  {console.log("editArea", data);dispatch({type:"UPDATE_AREA", payload: data})})
}

export function deleteArea(dispatch, body) {
  destroyArea(body)
  .then(data =>  {dispatch({type:"DELETE_AREA", payload: data})})
}

//Events//
export function getEvents(dispatch, id) {
  getFestivalEvents(id)
  .then(data => {console.log("Event data to be dispatched", data);dispatch({type: "GET_EVENTS", payload: data})})
}

export function newEvent(dispatch, body) {
  createEvent(body)
  .then(data =>  { dispatch({type:"NEW_EVENT", payload: data})})
}

export function editEvent(dispatch, body) {
  updateEvent(body)
  .then(data =>  {dispatch({type:"UPDATE_EVENT", payload: data})})
}

export function deleteEvent(dispatch, body) {
  destroyEvent(body)
  .then(data =>  {dispatch({type:"DELETE_EVENT", payload: data})})
}
//Festivals//
export function newFestival(dispatch, body) {
  createFestival(body)
  .then(data =>  {dispatch({type:"NEW_FESTIVAL", payload: data})})
}

export function editFestival(dispatch, body) {
  console.log("EDITFESTIVALBODY", body)
  updateFestival(body)
  .then(data =>  {console.log("updated fest", data); dispatch({type:"UPDATE_FESTIVAL", payload: data})
  })
}

export function deleteFestival(dispatch, id) {
  destroyFestival(id)
  .then(data =>  {dispatch({type:"DELETE_FESTIVAL", payload: data})})
}


export function getFestivals(dispatch, id) {
  getUserFestivals(id)
  .then(data => dispatch({type: "GET_FESTIVALS", payload: data}))
}

export function logOut (dispatch) {
  console.log("Inside Logout")
  dispatch({type: "LOG_OUT"})
}

export function signIn (dispatch, userDetails) {
  createUser(userDetails)
  .then(data => {
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      localStorage.setItem('token', data.token)
      return data.user
    }
  })
  .then(user => dispatch({type:"SIGN_UP", payload: user}))
}

export function logIn (dispatch, userDetails) {
  loginUser(userDetails)
  .then(data => {
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      localStorage.setItem('token', data.token)
      return data.user
    }
  })
  .then(user => dispatch({type:"LOG_IN", payload: user}))
}
