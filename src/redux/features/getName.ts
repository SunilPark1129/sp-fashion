import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasketProp } from "../../model/stateProps";

// const BASE_URL = "https://api.npoint.io/8fd7fe356036812046a7";
// const BASE_URL = "https://api.npoint.io/918666e7d6c8c48300b8";
const BASE_URL = "https://api.npoint.io/2bf88f9d9b4fe6d6531e";

export const requestNames = createAsyncThunk("cloth/fetchName", async () => {
  const response = await fetch(`${BASE_URL}/names`);
  if (!response.ok) {
    throw new Error("could not response");
  }
  return (await response.json()) as string[];
});

interface PostState {
  loading: boolean;
  data: string[];
  error: string | undefined;
}

const initialState: PostState = {
  loading: false,
  data: [],
  error: "",
};

export const getName = createSlice({
  name: "getName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestNames.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestNames.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(requestNames.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getName.reducer;
