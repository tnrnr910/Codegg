import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { Reset } from "styled-reset"
import { QueryClientProvider, QueryClient } from "react-query"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Reset />
    <App />
  </QueryClientProvider>
  // </React.StrictMode>
)
