import {configureStore} from "@reduxjs/toolkit";
import studentReducer from '../feature/studentRecords'

export const Store = configureStore({
    reducer : {
      students : studentReducer
    }
})