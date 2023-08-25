import { type Slice, createSlice } from "@reduxjs/toolkit"

const Category: Slice = createSlice({
  name: "category",
  initialState: [
    {
      title: "질의응답"
    },
    {
      title: "모임"
    },
    {
      title: "코딩팁"
    },
    {
      title: "공지사항"
    }
  ],
  reducers: {}
})

export default Category
