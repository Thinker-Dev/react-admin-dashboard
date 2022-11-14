import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  id: "",
  armazem: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.armazem = action.payload.armazem;
    },
    setSignOutState: (state) => {
      state.name = null;
      state.email = null;
      state.id = null;
      state.armazem = null;
    },
  },
});
export const { setUserLoginDetails, setSignOutState } = userSlice.actions;
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserId = (state) => state.user.id;
export const selectUserArmazem = (state) => state.user.armazem;
export default userSlice.reducer;
