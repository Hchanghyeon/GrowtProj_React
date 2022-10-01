import { createSlice } from "@reduxjs/toolkit";

//토큰 slice
export const UserSlice = createSlice(
    {
        name:"user",
        initialState:{
            id:null,
        },
        reducers:{
            SET_USER:(state,action) => {
                state.id = action.payload;
            },
            DELETE_USER:(state) => {
                state.id = null;
            }
        }
    }
)

export const {
    SET_USER,
    DELETE_USER
} = UserSlice.actions;

export default UserSlice.reducer;