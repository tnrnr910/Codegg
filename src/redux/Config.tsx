import { configureStore } from "@reduxjs/toolkit/dist/configureStore";
import Category from "./Category";

const store = configureStore( {
    reducer: {
        category: Category.reducer
    }
})

export default store;