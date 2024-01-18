import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasketProp } from "../../model/stateProps";

// const BASE_URL = "https://api.npoint.io/8fd7fe356036812046a7";
const BASE_URL = "https://api.npoint.io/918666e7d6c8c48300b8";

export const requestHTTP = createAsyncThunk(
  "cloth/fetchCloth",
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
  data: {
    id: string;
    name: string;
    sale: number;
    color: string;
    image: string[];
    price: number;
    gender: string;
    category: string;
  }[];
  error: string | undefined;
}

const initialState: PostState = {
  loading: false,
  data: [],
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
