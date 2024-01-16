import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface MyData {
  id: string;
  name: string;
  sale: number;
  color: string;
  image: string;
  price: number;
  gender: string;
  member: number;
  category: string;
}

const BASE_URL = "https://api.npoint.io/8fd7fe356036812046a7";

export const requestHTTP = createAsyncThunk(
  "cloth/fetchCloth",
  async (category: string) => {
    const response = await fetch(`${BASE_URL}/results/${category}`);
    if (!response.ok) {
      throw new Error("could not response");
    }
    return (await response.json()) as MyData[];
  }
);

interface PostState {
  loading: boolean;
  data: {
    id: string;
    name: string;
    sale: number;
    color: string;
    image: string;
    price: number;
    gender: string;
    member: number;
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
