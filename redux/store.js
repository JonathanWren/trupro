// Redux store

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
//persist
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
//storage
import AsyncStorage from '@react-native-async-storage/async-storage';
//slices
import jobsReducer from './jobsSlice';
import profileReducer from './profileSlice';
import chatsReducer from './chatsSlice';

const rootReducer = combineReducers({
    jobs: jobsReducer,
    profile: profileReducer,
    chats: chatsReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['jobs','profile', 'chats'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store)

