import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "src/models/user";

interface IUserSlice {
  user: User | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: IUserSlice = {
  user: undefined,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state: IUserSlice, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOut() {
      return initialState;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure, logOut } =
  userSlice.actions;
export default userSlice.reducer;
