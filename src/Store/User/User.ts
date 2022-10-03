import { createSlice } from "@reduxjs/toolkit";

//토큰 slice
export const UserSlice = createSlice(
    {
        name:"user",
        initialState:{
            authenticated:false, //인증상태
            accessToken:null, //access token
            expireTime:null, // 만료 시간
            userId:null,
            imgSrc:null,
        },
        reducers:{
            SET_USER:(state,action) => {
                state.authenticated = true; 
                state.accessToken = action.payload.accessToken;
                state.userId = action.payload.userId;
                state.imgSrc = action.payload.imgSrc;
            },
            DELETE_USER:(state) => {
                state.authenticated = false;
                state.accessToken = null;
                state.userId = null;
                state.imgSrc = null;
            },
        }
    }
)

export const {
    SET_USER,
    DELETE_USER,
} = UserSlice.actions;

export default UserSlice.reducer;