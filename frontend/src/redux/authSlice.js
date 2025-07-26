import {createSlice} from '@reduxjs/toolkit'

const authSclie = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
        //action
        setLoading:(state,action) =>{
            state.loading = action.payload;
        },
        setUser:(state,action) => {
            state.user = action.payload
        }
    }
});

export const { setLoading , setUser} = authSclie.actions;
export default authSclie.reducer;