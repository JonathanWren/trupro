// Redux store

import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './jobsSlice';
import profileReducer from './profileSlice';

export default configureStore({
    reducer: {
        jobs: jobsReducer,
        profile: profileReducer,
    },
});
