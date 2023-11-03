//Redux slice for storing the profile data
//
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../main/config.js';

const callAPI = async (url, input, getState, dispatch) => {
    const { authenticationDetails } = getState().profile;
    const json = JSON.stringify(input);

    const response = await fetch(config.BASE_URL + url, {
      method: 'POST',
      headers: {
        'sessionID': authenticationDetails.sessionCode,
        'Content-Type': 'application/json',
      },
      body: json,
    });

    if (response.status === 401 && !input["SecondTry"]) {
      await dispatch(login());
      input["SecondTry"] = true;
      await dispatch(callAPI(url, input, getState, dispatch));
      return rejectWithValue("Not Logged In")
    }

    if(!response.ok){
      return rejectWithValue("Failed")
    }

    return input;
  }

export const saveMainDetails = createAsyncThunk(
    'profile/saveMainDetails',
    async (input, { getState, dispatch }) => {
        const response = await callAPI('saveprofile', input, getState, dispatch);
        return response;
    }
  );

export const saveNextMove = createAsyncThunk(
    'profile/saveNextMove',
    async (input, { getState, dispatch }) => {
        const response = await callAPI('savenextmove', input, getState, dispatch);
        return response;
    }
  );

 export const login = createAsyncThunk(
    'profile/login',
    async (_, { getState }) => {
        const { authenticationDetails } = getState().profile;  
        const formBody = [];
        formBody.push("deviceID=" + encodeURIComponent(authenticationDetails.deviceID));
        formBody.push("deviceCode=" + encodeURIComponent(authenticationDetails.deviceCode));

        const formBodyString = formBody.join('&');
        const response = await fetch(config.BASE_URL + 'authenticatedevice?' + formBodyString, {
            method: 'GET',
        })

        if (!response.ok){
            console.error(response);
            return rejectWithValue("Failed")
        } else {
            const json = await response.json()

            console.log(json);
            return json.session_code
        }
    }
);

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        mainDetails: {
            firstName: '',
            lastName: '',
            hasLinkedId: false,
            linkedInProfileURL: '',
            currentRole: ''
        },
        authenticationDetails: {
            email: '',
            verificationCode: '',
            deviceID: '',
            deviceCode: '',
            sessionCode: '',
            users_id: '',
        },
        nextMove: {
            titles: [],
            locationName: '',
            locationLat: 0,
            locationLng: 0,
            locationDistance: 10,
            salary: 0,
            jobType: [],
            seniority: [],
        }
    },
    reducers: {
        updateEmail: (state, action) => {
            state.authenticationDetails.email = action.payload.email;
        },
        updateSessionCode: (state, action) => {
            state.authenticationDetails.sessionCode = action.payload.sessionCode;
        },
        updateVerificationCode: (state, action) => {
            state.authenticationDetails.verificationCode = action.payload.verificationCode;
        },
        updateDeviceDetails: (state, action) => {
            state.authenticationDetails.deviceID = action.payload.deviceID;
            state.authenticationDetails.deviceCode = action.payload.deviceCode;
            state.authenticationDetails.users_id = action.payload.users_id;
            state.authenticationDetails.verificationCode = action.payload.verificationCode;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveMainDetails.fulfilled, (state, action) => {
            // Handle the state update here update all values contained in the payload
            if ("first_name" in action.payload) {
                state.mainDetails.firstName = action.payload.first_name;
            }
            if ("last_name" in action.payload) {
                state.mainDetails.lastName = action.payload.last_name;
            }

            if ("has_linked_id" in action.payload) {
                state.mainDetails.hasLinkedId = action.payload.has_linked_id;
            }

            if ("linkedin_profile_url" in action.payload) {
                state.mainDetails.linkedInProfileURL = action.payload.linkedin_profile_url;
            }

            if ("job_title" in action.payload) {
                state.mainDetails.currentRole = action.payload.job_title;
            }   
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.authenticationDetails.sessionCode = action.payload;
        });
        builder.addCase(saveNextMove.fulfilled, (state, action) => {
            if ("titles" in action.payload) {
                state.nextMove.titles = action.payload.titles;
            }

            if ("locationName" in action.payload) {
                state.nextMove.locationName = action.payload.locationName;
            }

            if ("locationLat" in action.payload) {
                state.nextMove.locationLat = action.payload.locationLat;
            }

            if ("locationLng" in action.payload) {
                state.nextMove.locationLng = action.payload.locationLng;
            }

            if ("locationDistance" in action.payload) {
                state.nextMove.locationDistance = action.payload.locationDistance;
            }

            if ("salary" in action.payload) {
                state.nextMove.salary = action.payload.salary;
            }

            if ("jobType" in action.payload) {
                state.nextMove.jobType = action.payload.jobType;
            }

            if ("seniority" in action.payload) {
                state.nextMove.seniority = action.payload.seniority;
            }

        });
    },
});

export const { updateEmail, updateSessionCode, updateVerificationCode, updateDeviceDetails} = profileSlice.actions;

export default profileSlice.reducer;