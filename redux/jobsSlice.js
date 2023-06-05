// Redux slice for jobs storing list of jobs to review and also a list of saved jobs

import { createSlice } from '@reduxjs/toolkit';
import { jobsList } from './examplejobs';

export const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        jobsList: jobsList,
        savedJobs: [],
        discardedJobs: [],
        appliedJobs: [],
    },
    reducers: {
        saveJob: (state, action) => {
            const savedJob = state.jobsList.find(job => job.id === action.payload.id);
            if(saveJob){
                const remainingJobs = state.jobsList.filter(job => job.id !== action.payload.id);
                state.jobsList = remainingJobs;
                state.savedJobs.push(savedJob);
            }
        },
        discardJob: (state, action) => {
            const discardedJob = state.jobsList.find(job => job.id === action.payload.id);
            if(discardedJob){
                const remainingJobs = state.jobsList.filter(job => job.id !== action.payload.id);
                state.jobsList = remainingJobs;
                state.discardedJobs.push(discardedJob);
            }
        },
        applyForJob: (state, action) => {
            const appliedJob = state.jobsList.find(job => job.id === action.payload.id);
            if(appliedJob){
                const remainingJobs = state.jobsList.filter(job => job.id !== action.payload.id);
                state.jobsList = remainingJobs;
            } else {
                appliedJob = state.savedJobs.find(job => job.id === action.payload.id);
                if(appliedJob){
                    const remainingJobs = state.savedJobs.filter(job => job.id !== action.payload.id);
                    state.savedJobs = remainingJobs;
                } else {
                    appliedJob = state.discardedJobs.find(job => job.id === action.payload.id);
                    if(appliedJob){
                        const remainingJobs = state.discardedJobs.filter(job => job.id !== action.payload.id);
                        state.discardedJobs = remainingJobs;
                    } else {
                        return;
                    }
                }
            }
            state.appliedJobs.push(appliedJob);
        }
    }
});

export const { saveJob, discardJob, applyForJob } = jobsSlice.actions;

export default jobsSlice.reducer;
