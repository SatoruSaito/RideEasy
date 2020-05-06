import React from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import ReactNotification from "react-notifications-component"
import Home from "./components/home"
import Profile from "./components/profile"
import Vehicles from "./components/vehicles"
import VehicleDetails from "./components/vehicle-details"
import Callback from "./components/callback"
import Admin from "./components/admin"
import AddLoaction from "./components/admin/add-rental-location"
import AddVehicle from "./components/admin/add-vehicle";
import AddPriceRange from "./components/admin/add-price-range";
import UpdateMembership from "./components/admin/update-membership.js";

const App = () => (
  <Router>
    <ReactNotification />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/callback" component={Callback} />
      <Route path="/user/vehicles" component={Vehicles} />
      <Route path="/user/vehicle/:id" component={VehicleDetails} />
      <Route path="/user/profile" component={Profile} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/admin/addLocation" component={AddLoaction} />
      <Route exact path="/admin/addVehicle" component={AddVehicle} />
      <Route exact path="/admin/membershipUpdate" component={UpdateMembership} />
      <Route exact path="/admin/addPriceRange" component={AddPriceRange} />
    </Switch>
  </Router>
)

export default App
