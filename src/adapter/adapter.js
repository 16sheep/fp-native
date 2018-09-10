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



export {
  getFestivalEvents,
  getFestivalAreas,
  getFestivals
}
