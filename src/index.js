import React from "react"
import ReactDOM from "react-dom"
import { useRoutes } from "hookrouter"
import { Provider } from "react-redux"
import routes from "./router"
import "./css/index.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import "mdbreact/dist/css/mdb.css"

function App() {
  const routeResult = useRoutes(routes)
  console.log(routeResult)
  return routeResult
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
