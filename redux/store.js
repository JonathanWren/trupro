// Redux store

import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './jobsSlice';
import profileReducer from './profileSlice';
import chatsReducer from './chatsSlice';

export default configureStore({
    reducer: {
        chats: chatsReducer,
        jobs: jobsReducer,
        profile: profileReducer,
    },
});

//test
