import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import {persistStore, persistReducer, FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE, REGISTER,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import oderReducer from "./orderSlice";


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer:{
        user: persistedReducer,
        //order: oderReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)