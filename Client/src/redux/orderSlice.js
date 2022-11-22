import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name : "order",
    initialState:{
        property: null,
    },
    reducers: {
        createOrder:(state, action) =>{
            state.property = action.payload
        }
    }
})

export const {createOrder} = createSlice.actions;
export default orderSlice.reducer;