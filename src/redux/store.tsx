import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import getReducer from "./features/getSlice";
import likeReducer from "./features/LikeSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    getPost: getReducer,
    likeState: likeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;