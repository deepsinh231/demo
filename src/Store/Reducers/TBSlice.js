import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CONFIG from "../../Config/index.js";

//Usersignin
export const Usersignin = createAsyncThunk(
  "Usersignin",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_LOGIN,
        headers: {
          "Content-Type": "application/json",
        },
        url: `api/login`,
        data: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ Usersignin ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const TBSlice = createSlice({
  name: "TBSlice",
  initialState: {

    //Usersignin
    isUsersignin: false,
    isUsersigninFetching: false,
    UsersigninData: {},

    //success handling
    issuccess: false,
    successMessage: "",

    //Error handling
    isError: false,
    errorMessage: "",
  },
  reducers: {
    updateState: (state, { payload }) => {
      //Success state update
      state.issuccess =
        payload.issuccess !== undefined ? payload.issuccess : state.issuccess;
      state.successMessage =
        payload.successMessage !== undefined
          ? payload.successMessage
          : state.successMessage;

      //Error state update
      state.isError =
        payload.isError !== undefined ? payload.isError : state.isError;
      state.errorMessage =
        payload.errorMessage !== undefined
          ? payload.errorMessage
          : state.errorMessage;
      return state;
    },
  },
  extraReducers: (builder) => {

    //========= Usersignin
    builder.addCase(
      Usersignin.fulfilled,
      (state, { payload }) => {
        try {
          state.isUsersignin = true;
          state.UsersigninData = payload;
          state.isUsersigninFetching = false;
          state.issuccess = true;
          state.successMessage = "";
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: Usersignin.fulfilled try catch error extraReducers>>",
            error
          );
        }
      }
    );
    builder.addCase(
      Usersignin.rejected,
      (state, { payload }) => {
        try {
          state.UsersigninData = {};
          state.isUsersignin = false;
          state.isUsersigninFetching = false;
          state.issuccess = false;
          state.successMessage = "";
          state.isError = true;
          payload
            ? (state.errorMessage = payload.error
              ? payload.error
              : "Please try again.")
            : (state.errorMessage = "API Response Invalid. Please Check API");
        } catch (error) {
          console.error(
            "Error: [Usersignin.rejected] try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(Usersignin.pending, (state) => {
      state.isUsersigninFetching = true;
    });
  },
});

export const { updateState } = TBSlice.actions;
export const TBSelector = (state) => state.main.TB;
