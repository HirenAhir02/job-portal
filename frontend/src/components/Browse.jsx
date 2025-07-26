import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { setsearchQuery } from '../redux/jobSlice'

function Browse() {
  useGetAllJobs();
  const { jobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setsearchQuery(""));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({jobs.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {
            jobs.map((job) => (
              <Job key={job._id} job={job} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Browse
