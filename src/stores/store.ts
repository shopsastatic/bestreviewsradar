import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import generalSettingsSlice from "./general-settings/generalSettingsSlice";

const rootReducer = combineReducers({
  generalSettings: generalSettingsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  //
  middleware:
    process.env.NODE_ENV !== "production"
      ? // @ts-ignore
        (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : undefined,
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
