import { type ToolkitStore, configureStore } from "@reduxjs/toolkit/dist/configureStore";
import Category from "./Category";

const store: ToolkitStore = configureStore( {
    reducer: {
        category: Category.reducer
    }
})

export default store;