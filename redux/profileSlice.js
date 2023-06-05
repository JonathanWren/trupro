//Redux slice for storing the profile data
//
import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        mainDetails: {
            firstName: '',
            lastName: '',
            location: '',
        },
        currentRole: {
            title: '',
            organisation: '',
            stillInRole: true,
        },
        nextMove: {
            title: '',
            location: '',
            salary: 0,
            jobType: [],
            seniority: [],
        }
    },
    reducers: {
        updateFirstName: (state, action) => {
            state.mainDetails.firstName = action.payload.firstName;
        },
        updateLastName: (state, action) => {
            state.mainDetails.lastName = action.payload.lastName;
        },
        updateMainLocation: (state, action) => {
            state.mainDetails.location = action.payload.location;
        },
        updateCurrentRole: (state, action) => {
            state.currentRole = action.payload;
        },
        updateNextTitle: (state, action) => {
            state.nextMove.title = action.payload.title;
        },
        updateNextLocation: (state, action) => {
            state.nextMove.location = action.payload.location;
        },
        updateNextSalary: (state, action) => {
            state.nextMove.salary = action.payload.salary;
        },
        updateNextJobType: (state, action) => {
            state.nextMove.jobType = action.payload.jobType;
        },
        updateNextSeniority: (state, action) => {
            state.nextMove.seniority = action.payload.seniority;
        }
    }
});

export const { updateFirstName, updateLastName, updateMainLocation, updateCurrentRole, updateNextTitle, updateNextLocation, updateNextSalary, updateNextJobType, updateNextSeniority } = profileSlice.actions;

export default profileSlice.reducer;