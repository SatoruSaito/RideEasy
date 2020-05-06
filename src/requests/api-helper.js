const BASE_URL = "http://localhost:3000"
export const APIS = {
  vehicles: `${BASE_URL}/vehicles`,
  vehicleDetails: (vehicleId) => `${BASE_URL}/vehicles/${vehicleId}`,
  deleteVehicle: (vehicleId) => `${BASE_URL}/vehicles/${vehicleId}`,
  addVehicles: `${BASE_URL}/vehicles`,
  reserveACar: `${BASE_URL}/reservations`,
  membersList: `${BASE_URL}/membership`,
  terminateMembership: (membershipId) => `${BASE_URL}/membership/${membershipId}`,
  addLocation: `${BASE_URL}/locations`,
  deleteLocation: (locationId) => `${BASE_URL}/locations/${locationId}`,
  locations: `${BASE_URL}/locations`,
  vehicleTypes: `${BASE_URL}/vehicle_type`,
  userStatus: (userId) => `${BASE_URL}/users/${userId}/membership`,
  updateUserMembershipByUserUuid: (userId) => `${BASE_URL}/users/${userId}/membership`,
  userDetails: (userId, userStatus) =>
    userStatus === "INCOMPLETE"
      ? `${BASE_URL}/users/${userId}?registration_flow=true`
      : `${BASE_URL}/users/${userId}`,
  getReservation: (userId) => `${BASE_URL}/users/${userId}/reservations`,
  deleteReservation: (reservationId) => `${BASE_URL}/reservations/${reservationId}`,
  pickupVehicle: (reservationId) => `${BASE_URL}/reservations/${reservationId}`,
  policy: `${BASE_URL}/policy`,
  priceRange: (vehicleUuid) => `${BASE_URL}/vehicle_type/${vehicleUuid}/vehiclepricerange/totalprice`,
  priceRangeByVehicleType: (vehicleUuid) => `${BASE_URL}/vehicle_type/${vehicleUuid}/vehiclepricerange`,
  addVehicleRange: (priceRangeUuid) => `${BASE_URL}/vehiclepricerange/${priceRangeUuid}`,
  returnVehicle: (reservationId) => `${BASE_URL}/reservations/${reservationId}/return_vehicle`

}
