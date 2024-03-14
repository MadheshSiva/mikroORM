import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from 'axios'
import {endPoints} from "../API"

const initialState = {
    loading : true,
    data : [],
    error : ""
}

export const studentThunk = createAsyncThunk('feature/studentThunk', async(email) => {
      console.log(email,"email12")
    //  await axios.post(`${endPoints.login}/`)

})

const studentSlice = createSlice({
    name : 'student',
    initialState,
    reducers:{
        list : (state, action) => {
           state.data = action.payload
        } 
    },
})
export const {list} = studentSlice.actions;
export default studentSlice.reducer;