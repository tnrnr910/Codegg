import { configureStore, createSlice } from "@reduxjs/toolkit"

// 초기 상태 정의
const initialState = {
  searchResults: [],
  signupTap: false // 추가: 회원가입 탭 상태
}

// createSlice를 사용하여 reducer 및 action을 정의
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // SET_SEARCH_RESULTS 액션을 정의
    SET_SEARCH_RESULTS: (state, action) => {
      return {
        ...state,
        searchResults: action.payload
      }
    },
    // 회원가입 탭 상태를 변경하는 액션
    SET_SIGNUP_TAP: (state, action) => {
      return {
        ...state,
        signupTap: action.payload
      }
    }
  }
})

export const { SET_SEARCH_RESULTS, SET_SIGNUP_TAP } = searchSlice.actions

// configureStore를 사용하여 스토어 생성
const store = configureStore({
  reducer: {
    initialStates: searchSlice.reducer // 스토어에 searchSlice.reducer 추가
  }
})

export default store
