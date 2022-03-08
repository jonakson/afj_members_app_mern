import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memberService from "../../services/memberService";

// Get Member from localStorage
const member = JSON.parse(localStorage.getItem("member"));

const initialState = {
  member: member ? member : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register Member
export const register = createAsyncThunk(
  "auth/register",
  async (member, thunkAPI) => {
    try {
      return await memberService.register(member);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.member = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.member = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
