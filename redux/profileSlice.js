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
            hasLinkedId: false,
            linkedInProfileURL: '',
            currentRole: '',
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
            titles: [],
            locationName: '',
            locationLat: 0,
            locationLng: 0,
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
        updateHasLinkedId: (state, action) => {
            state.mainDetails.hasLinkedId = action.payload.hasLinkedId;
        },
        updateLinkedInProfileURL: (state, action) => {
            state.mainDetails.linkedInProfileURL = action.payload.linkedInProfileURL;
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
        updateCurrentRoleTitle: (state, action) => {
            state.currentRole.title = action.payload.title;
        },
        updateNextTitles: (state, action) => {
            state.nextMove.titles = action.payload.titles;
        }, 
        updateNextLocation: (state, action) => {
            for (let key in action.payload) {
                state.nextMove[key] = action.payload[key];
            };
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

export const { updateFirstName, updateUsersID, updateLastName, updateHasLinkedId, updateLinkedInProfileURL, updateEmail, updateSessionCode, updateVerificationCode, updateDeviceID, updateDeviceCode, updateCurrentRoleTitle, updateNextTitles, updateNextLocation, updateNextSalary, updateNextJobType, updateNextSeniority } = profileSlice.actions;

export default profileSlice.reducer;