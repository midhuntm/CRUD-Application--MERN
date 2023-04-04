import {createSlice} from '@reduxjs/toolkit';

export const crudSlice = createSlice({
    name : 'crud',
    initialState : { search : ''},
    reducers : {
        addtoCart : (state,action) =>{
             state.search = action.payload
        },
        setData(state)
        {
            state.search = 'uio'
        }
    }   
})
export const searchActions = crudSlice.actions;
export default crudSlice;
