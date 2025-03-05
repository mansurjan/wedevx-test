import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "./slices/leadSlice";

export const store = () =>
	configureStore({
		reducer: {
			leads: leadReducer,
		},
	});

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
