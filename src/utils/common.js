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
      return place.types.includes("administrative_area_level_1") || place.types.includes("political")
    })
  return filter[0].long_name
}
export const getCity = (places) => {
  const filter = places.filter((place) => {
      return place.types.includes("locality") || place.types.includes("political")
    })
  return filter[0].long_name
}

