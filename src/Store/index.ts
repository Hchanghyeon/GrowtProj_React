import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import TokenReducer from "./Token/Token";

const persistConfig:any= {
    key: 'root',
    storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, TokenReducer);

export default configureStore({
    reducer: {
        token:persistedReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
});