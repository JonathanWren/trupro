//Redux slice for storing the profile data
//
import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        mainDetails: {
            firstName: '',
            lastName: '',
            email: '',
            verificationCode: '',
            deviceID: '',
            deviceCode: '',
            sessionCode: '',
            users_id: '',
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
        updateUsersID: (state, action) => {
            state.mainDetails.users_id = action.payload.users_id;
        },
        updateEmail: (state, action) => {
            state.mainDetails.email = action.payload.email;
        },
        updateSessionCode: (state, action) => {
            state.mainDetails.sessionCode = action.payload.sessionCode;
        },
        updateVerificationCode: (state, action) => {
            state.mainDetails.verificationCode = action.payload.verificationCode;
        },
        updateDeviceID: (state, action) => {
            state.mainDetails.deviceID = action.payload.deviceID;
        },
        updateDeviceCode: (state, action) => {
            state.mainDetails.deviceCode = action.payload.deviceCode;
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

export const { updateFirstName, updateUsersID, updateLastName, updateEmail, updateSessionCode, updateVerificationCode, updateDeviceID, updateDeviceCode, updateCurrentRole, updateNextTitle, updateNextLocation, updateNextSalary, updateNextJobType, updateNextSeniority } = profileSlice.actions;

export default profileSlice.reducer;