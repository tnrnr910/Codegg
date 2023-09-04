import { createStore } from "redux"

const initialState = {
  searchResults: []
}

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload
      }
    default:
      return state
  }
}

const store = createStore(rootReducer)

export default store
