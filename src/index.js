import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./app"
import store from "./store"
import "./css/index.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import "mdbreact/dist/css/mdb.css"
import "react-notifications-component/dist/theme.css"

const rootElement = document.getElementById("root")

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
