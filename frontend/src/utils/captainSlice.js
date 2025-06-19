
import { createSlice } from "@reduxjs/toolkit";

const captainSlice=createSlice({
    
    name:'captain',
    initialState:null,
    reducers:{
        addCaptain:(state,action)=>{
            return action.payload
        },
           removeCaptain: (state, action) => {
      return null;
    },
    }
})

export const{addCaptain,removeCaptain}=captainSlice.actions

export default captainSlice.reducer