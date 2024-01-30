import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../data/key";

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
