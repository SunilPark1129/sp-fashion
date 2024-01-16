import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import getReducer from "./features/getSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    getPost: getReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
