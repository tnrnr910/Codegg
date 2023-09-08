import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { Reset } from "styled-reset"
import { QueryClientProvider, QueryClient } from "react-query"
import store from "./redux/store"
import { Provider } from "react-redux"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Reset />
      <App />
    </QueryClientProvider>
  </Provider>

  // </React.StrictMode>
)
