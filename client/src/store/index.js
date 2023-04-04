import {configureStore } from '@reduxjs/toolkit';
import searchSlice from './search-Slice';

const store = configureStore({
    reducer :{
        crud : searchSlice.reducer
    }
})

export default store;