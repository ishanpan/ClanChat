import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		loggedin: 0,
		userInfo: "",
		nickname: "",
	},
	reducers: {
		login: (state) => {
			state.loggedin = 1;
			console.log(state.loggedin);
		},
		logout: (state) => {
			state.loggedin = 0;
		},
		loginUser: (state, action) => {
			state.userInfo = action.payload;
			console.log(state.userInfo);
		},
		setNickname: (state, action) => {
			state.nickname = action.payload;
		},
	},
});

export const { login, logout, loginUser, setNickname } = authSlice.actions;
export default authSlice.reducer;
