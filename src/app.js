import React from "react"
// import { useRoutes } from "hookrouter";
import { Router, Route } from "react-router-dom"
// import routes from "./router";
import Home from "./components/home"
import Profile from "./components/profile"
import Vehicles from "./components/vehicles"
import VehicleDetails from "./components/vehicle-details"
import Callback from "./components/callback"

// const App=() => {
//   const routeResult = useRoutes(routes);
//   console.log(routeResult);
//   return routeResult;
// }
//  export default App;

import { createBrowserHistory } from "history"

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Route exact path="/" component={Home} />
    <Route exact path="/callback" component={Callback} />
    <Route path="/user/vehicles" component={Vehicles} />
    <Route path="/user/vehicle/:id" component={VehicleDetails} />
    <Route path="/user/profile" component={Profile} />
  </Router>
)

export default App
