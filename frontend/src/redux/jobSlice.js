import {createSlice} from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs: [],
    allAdminJobs:[],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs : [] ,
    searchQuery: "",
  },
  reducers: {
    setAlljobs: (state, action) => {
      state.jobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    }, 

    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;  
    },

    setsearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },

    setallAppliedJobs : (state, action) => {
      state.allAppliedJobs = action.payload;
    },

    setsearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

export const {setAlljobs, setSingleJob,setAllAdminJobs, setsearchJobByText, setallAppliedJobs, setsearchQuery} = jobSlice.actions;
export default jobSlice.reducer;