import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import getReducer from "./features/getSlice";
import getAllReducer from "./features/getAllSlice";
import likeReducer from "./features/LikeSlice";
import getNamesReducer from "./features/getName";
import sortReducer from "./features/sortSlice";
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    getPost: getReducer,
    getAllPost: getAllReducer,
    likeState: likeReducer,
    getNames: getNamesReducer,
    getSort: sortReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
