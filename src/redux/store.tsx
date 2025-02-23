import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';
import { registerAPI } from "../features/register/registerAPI"; 
import { loginAPI } from "../features/login/loginAPI";
import { propertiesApi } from "../features/properties/propertiesAPI";
import { unitAPI } from "../features/units/unitsAPI";
import { tenantAPI } from "../features/tenants/tenantsAPI";
import { leaseAPI } from "../features/lease/leaseAPI";
import { paymentsApi } from "../features/payments/paymentsAPI";



const persistConfig = {
    key: "root",
    storage,
};


const rootReducer = combineReducers({
    [registerAPI.reducerPath]: registerAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [unitAPI.reducerPath]: unitAPI.reducer,
    [tenantAPI.reducerPath]:tenantAPI.reducer,
    [leaseAPI.reducerPath]:leaseAPI.reducer,
    [paymentsApi.reducerPath]:paymentsApi.reducer


       // Add other reducers here
    
    // Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(registerAPI.middleware 
            ,loginAPI.middleware 
            ,propertiesApi.middleware 
            ,unitAPI.middleware ,
            tenantAPI.middleware,leaseAPI.middleware ,paymentsApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;