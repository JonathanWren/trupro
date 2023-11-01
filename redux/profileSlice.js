//Redux slice for storing the profile data
//
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '/main/config.js';

export const saveMainDetails = createAsyncThunk(
    'profile/saveMainDetails',
    async (input, { getState, dispatch }) => {
      const { authenticationDetails } = getState().profile;
      const formBody = [];
      for (let key in input) {
          const encodedKey = encodeURIComponent(key);
          const encodedValue = encodeURIComponent(input[key]);
          formBody.push(encodedKey + '=' + encodedValue);
      }
      const formBodyString = formBody.join('&');
      const response = await fetch(config.BASE_URL + 'saveprofile?' + formBodyString, {
        method: 'GET',
        headers: {
          'sessionID': authenticationDetails.sessionCode,
        }
      });

      if (response.status === 401 && !input["SecondTry"]) {
        await dispatch(login());
        input["SecondTry"] = true;
        await dispatch(saveMainDetails(input));
        return rejectWithValue("Not Logged In")
      }

      if(!response.ok){
        return rejectWithValue("Failed")
      }

      return input;
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
        updateCurrentRoleTitle: (state, action) => {
            state.mainDetails.currentRole = action.payload.title;
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
        })
    },
});

const updateDetails = (state, first_call = true) => {
    const formBody = [];
    for (let key in state.mainDetails) {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(state.mainDetails[key]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    const formBodyString = formBody.join('&');
    fetch(config.BASE_URL + 'saveprofile?' + formBodyString, {
        method: 'GET',
        headers: {
            'sessionID': state.authenticationDetails.sessionCode,
        },
    })
    .then(response => {
        console.log("here")
        console.log(formBodyString)
        if (!response.ok){
            if(response.status === 401 && first_call){
                login(state);
                updateDetails(state, false);
            } else {
                console.error(response);
                alert('Failed to update details. Please try again later.');
            }
        } else {
            response.json()
            .then((json) => {
                console.log(json);
            })
            .catch((error) => {
                console.error(error);
                alert('There was an error updating your details. Please try again later.');
            })
            .finally(() => {
            });
        }
    })
    .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
    })
}


export const { updateEmail, updateSessionCode, updateVerificationCode, updateDeviceDetails, updateCurrentRoleTitle, updateNextTitles, updateNextLocation, updateNextSalary, updateNextJobType, updateNextSeniority } = profileSlice.actions;

export default profileSlice.reducer;