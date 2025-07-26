import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import jobSlice from "./jobSlice"
import applicationSlice from "./applicationSlice"
import companySlice from "./companySlice"
 import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
 } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    // whitelist: ['auth'] // only auth will be persisted
}

const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application : applicationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


// const store = configureStore({
//     reducer:{
//         auth: authSlice,
//         job: jobSlice
//     }
// })


export default store;
