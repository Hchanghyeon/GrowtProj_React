import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import TokenReducer from "./Token/Token";
import UserReducer from "./User/User";

const persistConfig:any= {
    key: 'root',
    storage: storageSession,
}

const userPersistedReducer = persistReducer(persistConfig, UserReducer);

export default configureStore({
    reducer: {
        user:userPersistedReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
});