// Redux slice for the list of chats

import { createSlice } from '@reduxjs/toolkit';

export const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        chats: [],
    },

    reducers: {
        addChat: (state, action) => {
            if(!state.chats.some(chat => chat.id === action.payload.id)) {
                state.chats.push(action.payload);
            }
        }
    }
});

export const { addChat } = chatsSlice.actions;

export default chatsSlice.reducer;