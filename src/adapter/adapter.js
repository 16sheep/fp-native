const urlBase = `http://localhost:3006/api/v1`

//Get all Festivals

const getFestivals = () => {
  return fetch(`${urlBase}/festivals`, {
  }).then(resp => resp.json())
}

const getFestivalAreas = (id) => {
  return fetch(`${urlBase}/festival_areas/${id}`, {
  }).then(resp => resp.json())
}

const getFestivalEvents = (id) => {
  return fetch(`${urlBase}/festival_events/${id}`, {
  }).then(resp => resp.json())
}

////FROM ADMIN///
const createUser = (userDetails) => {
  return fetch(`${urlBase}/users`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userDetails)
  }).then(resp => resp.json())
}

const updateFestival = (festivalDetails) => {
  return fetch(`${urlBase}/festivals/${festivalDetails.id.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(festivalDetails)
  }).then(resp => resp.json())
}



const loginUser = (userDetails) => {
  return fetch(`${urlBase}/login`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userDetails)
  }).then(resp => resp.json())
}

const getCurrentUser = (token) => {
  return fetch(`${urlBase}/current_user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
  }).then(resp => resp.json())
}

const getUserFestivals = (id) => {
  return fetch(`${urlBase}/users/${id}/festivals`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  }).then(resp => resp.json())
}
//ONLY need to send user_id and festival_id
const setUserFestivals = (body) => {
  return fetch(`${urlBase}/users/${body.user_id}/festivals`, {
    headers: {
      method:"POST",
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
      body:JSON.stringify(body)
    }
  }).then(resp => resp.json())
}

//EVENTS//

// const getFestivalEvents = (id) => {
//   return fetch(`${urlBase}/festival_events/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: localStorage.getItem('token')
//     }
//   }).then(resp => resp.json())
// }

const createEvent = (eventDetails) => {
  return fetch(`${urlBase}/events`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    method: 'POST',
    body: JSON.stringify(eventDetails)
  }).then(resp => resp.json())
}

const updateEvent = (eventDetails) => {
  console.log("eventDetails", eventDetails)
  return fetch(`${urlBase}/events/${eventDetails.event_id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    method: 'PATCH',
    body: JSON.stringify(eventDetails)
  }).then(resp => resp.json())
}

const destroyEvent = (details) => {
  console.log("deleteid", details)
  return fetch(`${urlBase}/events/${details.event_id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    method: 'DELETE',
    body: JSON.stringify(details)
  }).then(resp => resp.json())
}


//AREAS
// const getFestivalAreas = (id) => {
//   return fetch(`${urlBase}/festival_areas/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: localStorage.getItem('token')
//     }
//   }).then(resp => resp.json())
// }

export {
  createUser,
  loginUser,
  getCurrentUser,
  getUserFestivals,
  createEvent,
  updateEvent,
  destroyEvent,
  getFestivalEvents,
  getFestivalAreas,
  getFestivals,
}
