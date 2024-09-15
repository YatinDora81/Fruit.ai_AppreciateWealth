import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name : "User",
    initialState : {
        User : JSON.parse(localStorage.getItem("User")) || null,
    },
    reducers : {
        addUser : (state,action)=>{
            state.User = action.payload;
            localStorage.setItem("User" , JSON.stringify(action.payload) );
        },
        removeUser : (state,action)=>{
            state.User = null;
        }
    }
})

export const {addUser , removeUser} = UserSlice.actions;
export default UserSlice.reducer;