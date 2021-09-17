import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		loggedin: 0,
	},
	reducers: {
		login: (state) => {
			state.loggedin = 1;
			console.log(state.loggedin);
		},
		logout: (state) => {
			state.loggedin = 0;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
