//Redux slice for storing the profile data
//
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../main/config.js';

const callAuthenticatedAPI = async (url, input, getState, dispatch, rejectWithValue) => {
    const { authenticationDetails } = getState().profile;

    const SecondTry = "SecondTry" in input;
    if (SecondTry) {
        delete input["SecondTry"];
    }
    const dataLen = Object.keys(input).length;

    var options = {
        method: dataLen > 0 ? 'POST' : 'GET',
        headers: {
            'sessionID': authenticationDetails.sessionCode,
        }
    }

    if (dataLen > 0) {
        options.body = JSON.stringify(input);;
        options.headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(config.BASE_URL + url, options);

    if (response.status === 401 && !SecondTry) {
      await dispatch(login());
      input["SecondTry"] = true;
      return callAuthenticatedAPI(url, input, getState, dispatch);
    }

    if(!response.ok){
      return rejectWithValue("Failed")
    }

    if (response.headers.get('Content-Type') === 'application/json') {
        return await response.json();
    } else {
        return input;
    }
  }

export const getMainDetails = createAsyncThunk(
    'profile/getMainDetails',
    async (input, { getState, dispatch, rejectWithValue }) => {
        const response = await callAuthenticatedAPI('getprofile', {}, getState, dispatch, rejectWithValue);
        return response;
    }
);

export const saveMainDetails = createAsyncThunk(
    'profile/saveMainDetails',
    async (input, { getState, dispatch, rejectWithValue }) => {
        const response = await callAuthenticatedAPI('saveprofile', input, getState, dispatch, rejectWithValue);
        return input;
    }
  );

export const getNextMove = createAsyncThunk(
    'profile/getNextMove',
    async (input, { getState, dispatch, rejectWithValue }) => {
        const response = await callAuthenticatedAPI('getnextmove', {}, getState, dispatch, rejectWithValue);
        return response;
    }
);

export const validateEmailToken = createAsyncThunk(
    'profile/validateEmailToken',
    async (input, { getState, rejectWithValue }) => {
        const { authenticationDetails } = getState().profile;

        const params = {
            email: authenticationDetails.email,
            token: authenticationDetails.verificationCode,
        };

        var options = {
            method: 'POST',
            headers: {
                'sessionID': authenticationDetails.sessionCode,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }
    
        const response = await fetch(config.BASE_URL + 'validateemailtoken', options);

        if(response.status === 401){
            return rejectWithValue("Invalidtoken");
        }

        if(!response.ok){
            return rejectWithValue("Failed")
        }

        return response.json();
    }
);

export const saveNextMove = createAsyncThunk(
    'profile/saveNextMove',
    async (input, { getState, dispatch, rejectWithValue }) => {
        const response = await callAuthenticatedAPI('savenextmove', input, getState, dispatch, rejectWithValue);
        return input;
    }
  );

export const getRole = createAsyncThunk(
    'profile/getRole',
    async (input, { getState, dispatch, rejectWithValue }) => {
        const { viewRole } = getState().profile;
        if (viewRole != null && viewRole.roleID != input.roleID) {
            const response = await callAuthenticatedAPI('getrole', input, getState, dispatch, rejectWithValue);
            return response;
        } else {
            return;
        }
    }
  );

 export const login = createAsyncThunk(
    'profile/login',
    async (_, { getState, rejectWithValue }) => {
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

const updateMainDetails = (state, action) => {
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
};

const updateNextMove = (state, action) => {
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

    if ("locationRemote" in action.payload) {
        state.nextMove.locationRemote = action.payload.locationRemote;
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
};

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
            signed_up: false,
        },
        nextMove: {
            titles: [],
            locationName: '',
            locationLat: 0,
            locationLng: 0,
            locationDistance: 10,
            locationRemote: false,
            salary: 0,
            jobType: [],
            seniority: [],
        },
        viewRole: {
            roleID: 0,
            title: '',
            location: '',
            salary: '',
            jobType: '',
            seniority: '',
            description: '',
            flexibility: '',
        },
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
        updateVerificationCodeAndEmail: (state, action) => {
            state.authenticationDetails.verificationCode = action.payload.verificationCode;
            state.authenticationDetails.email = action.payload.email;
        },
        updateDeviceDetails: (state, action) => {
            state.authenticationDetails.deviceID = action.payload.deviceID;
            state.authenticationDetails.deviceCode = action.payload.deviceCode;
            state.authenticationDetails.users_id = action.payload.users_id;
            state.authenticationDetails.verificationCode = action.payload.verificationCode;
        },
        setSignedUp: (state, action) => {
            state.authenticationDetails.signed_up = action.payload.signed_up;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMainDetails.fulfilled, updateMainDetails);
        builder.addCase(saveMainDetails.fulfilled, updateMainDetails);
        builder.addCase(login.fulfilled, (state, action) => {
            state.authenticationDetails.sessionCode = action.payload;
        });
        builder.addCase(getNextMove.fulfilled, updateNextMove);
        builder.addCase(saveNextMove.fulfilled, updateNextMove);
        builder.addCase(validateEmailToken.fulfilled, (state, action) => {
            state.authenticationDetails.verificationCode = '';
            state.authenticationDetails.deviceID = action.payload.device_id;
            state.authenticationDetails.deviceCode = action.payload.device_code;
            state.authenticationDetails.users_id = action.payload.users_id;
        });
        builder.addCase(validateEmailToken.rejected, (state, action) => {
            state.authenticationDetails.verificationCode = '';
        });
        builder.addCase(getRole.fulfilled, (state, action) => {
            console.log("fulfilled");
            console.log(action.payload);
            if(state.viewRole == null){
                state.viewRole = {};
            }
            state.viewRole.roleID = action.payload.roleID;
            state.viewRole.title = action.payload.title;
            state.viewRole.location = action.payload.Name;
            state.viewRole.salary = action.payload.salary_range;
            if (action.payload.jobtype_fulltime) {
                state.viewRole.jobType = ("Full Time");
            } else if (action.payload.jobtype_parttime) {
                state.viewRole.jobType = ("Part Time");
            } else if (action.payload.jobtype_contract) {
                state.viewRole.jobType = ("Contract");
            } else if (action.payload.jobtype_temporary) {
                state.viewRole.jobType = ("Temporary");
            }
            state.viewRole.seniority = action.payload.seniority;
            state.viewRole.description = action.payload.description;
            state.viewRole.flexibility = action.payload.flexibility;
        });
    },
});

export const { updateEmail, setSignedUp, updateSessionCode, updateVerificationCode, updateVerificationCodeAndEmail, updateDeviceDetails} = profileSlice.actions;

export default profileSlice.reducer;