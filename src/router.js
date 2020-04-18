import React from "react"
import Home from "./components/home"
import Profile from "./components/profile"
import Vehicles from "./components/vehicles"
import VehicleDetails from "./components/vehicle-details"
import Callback from "./components/callback"
import Admin from "./components/admin"
import AddLoaction from "./components/admin/add-rental-location"
import AddVehicle from "./components/admin/add-vehicle"

const routes = {
  "/": () => <Home />,
  "/callback": () => <Callback />,
  "/user/vehicles": () => <Vehicles />,
  "/user/vehicle/:id": ({ id }) => <VehicleDetails id={id} />,
  "/user/profile": () => <Profile />,
  "/admin": () => <Admin />,
  "/admin/addLocation": () => <AddLoaction />,
  "/admin/addVehicle": () => <AddVehicle />
}

export default routes
