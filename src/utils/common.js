import map from "lodash/map"
import get from "lodash/get"

export const getZipcode = (places) => {
  const filter = places.filter((place) => {
    return place.types[0] === "postal_code"
  })
  return filter[0].long_name
}

export const getState = (places) => {
  const filter = places.filter((place) => {
    return (
      place.types.includes("administrative_area_level_1") ||
      place.types.includes("political")
    )
  })
  return filter[0].long_name
}
export const getCity = (places) => {
  const filter = places.filter((place) => {
    return place.types.includes("locality") || place.types.includes("political")
  })
  return filter[0].long_name
}

export function getCookie(cname) {
  let name = cname + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == " ") {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

export function setCookie(cname, cvalue, exdays, path) {
  if (cvalue == undefined) cvalue = ""
  if (path == undefined) path = "/"
  let d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  let expires = "expires=" + d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + "; path=" + path + ";"
}

export  function formatDateToISO(date){
return date && new Date(date).toISOString()
}

export  function formatDatetoLocal(date){
  return  date && new Date(date).toLocaleDateString()
}

