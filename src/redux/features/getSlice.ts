import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasketProp } from "../../model/stateProps";
import { BASE_URL } from "../../data/key";

export const requestHTTP = createAsyncThunk(
  "api/fetchSingle",
  async (category: string) => {
    const response = await fetch(`${BASE_URL}/results/${category}`);
    if (!response.ok) {
      throw new Error("could not response");
    }
    return (await response.json()) as BasketProp[];
  }
);

interface PostState {
  loading: boolean;
  data:
    | {
        id: string;
        name: string;
        sale: number;
        color: string;
        image: string[];
        price: number;
        gender: string;
        category: "coat" | "hoodie" | "shirt" | "sweater";
      }[]
    | null;
  error: string | undefined;
}

const initialState: PostState = {
  loading: false,
  data: null,
  error: "",
};

export const getSlice = createSlice({
  name: "getPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestHTTP.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestHTTP.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(requestHTTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getSlice.reducer;
