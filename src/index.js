import React from "react";
import ReactDOM from "react-dom";
import { useRoutes } from "hookrouter";
import routes from "./router";
import "./css/index.css";

function App() {
  const routeResult = useRoutes(routes);
  return routeResult;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);