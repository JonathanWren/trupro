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
            phoneNumber: '',
            countryCode: 'GB',
            countryNumber: '44',
        },
        currentRole: {
            title: '',
            organisation: '',
            stillInRole: true,
        },
        nextMove: {
            title: '',
            location: {
                name: '',
                lat: 0,
                lng: 0,
            },
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
        updatePhoneNumber: (state, action) => {
            state.mainDetails.phoneNumber = action.payload.phoneNumber;
        },
        updateCountryCode: (state, action) => {
            state.mainDetails.countryCode = action.payload.countryCode;
        },
        updateCountryNumber: (state, action) => {
            state.mainDetails.countryNumber = action.payload.countryNumber;
        },
        updateEmail: (state, action) => {
            state.mainDetails.email = action.payload.email;
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

export const { updateFirstName, updateLastName, updateEmail, updatePhoneNumber, updateCountryCode, updateCountryNumber, updateCurrentRole, updateNextTitle, updateNextLocation, updateNextSalary, updateNextJobType, updateNextSeniority } = profileSlice.actions;

export default profileSlice.reducer;