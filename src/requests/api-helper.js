const BASE_URL = "http://localhost:3000"
export const APIS = {
  vehicles: `${BASE_URL}/vehicles`,
  vehicleDetails: (vehicleId) => `${BASE_URL}/vehicles/${vehicleId}`,
  addVehicles: `${BASE_URL}/addvehicle`,
  reserveACar: `${BASE_URL}/reservations`,
  membersList: `${BASE_URL}/membership`,
  terminateMembership: (userId) => `${BASE_URL}/users/${userId}/membership`,
  addLocation: `${BASE_URL}/locations`,
  locations: `${BASE_URL}/locations`,
  vehicleTypes: `${BASE_URL}/vehicle_type`,
  userStatus: (userId) => `${BASE_URL}/users/${userId}/membership`,
  userDetails: (userId, userStatus) =>
    userStatus === "INCOMPLETE"
      ? `${BASE_URL}/users/${userId}?registration_flow = true`
      : `${BASE_URL}/users/${userId}`,
  getReservation: (userId) => `${BASE_URL}/users/${userId}/reservations`,
  deleteReservation: (reservationId) => `${BASE_URL}/reservations/${reservationId}`,
  pickupVehicle: (reservationId) => `${BASE_URL}/reservations/${reservationId}`,
}
