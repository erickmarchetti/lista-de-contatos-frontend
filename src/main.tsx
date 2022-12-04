import React from "react"
import ReactDOM from "react-dom/client"

import "antd/dist/reset.css"

import Provider from "./providers"
import { BrowserRouter } from "react-router-dom"
import Router from "./routes"
import GlobalStyle from "./styles/GlobalStyle"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <GlobalStyle />
        <Router />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
