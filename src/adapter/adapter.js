import { AsyncStorage } from "react-native"

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

const getFestivalCategories = (id) => {
  return fetch(`${urlBase}/festival_categories/${id}`, {
  }).then(resp => resp.json())
}

const getFestivalEvents = (id) => {
  return fetch(`${urlBase}/festival_events/${id}`, {
  }).then(resp => resp.json())
}

//AsyncStorage

_storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
}

_retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
    }
   } catch (error) {
   }
}

_retrieveData("areas")

export {
  getFestivalEvents,
  getFestivalAreas,
  getFestivals,
  getFestivalCategories
}
