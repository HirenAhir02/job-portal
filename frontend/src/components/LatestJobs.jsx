import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

function LatestJobs() {
  const { jobs } = useSelector(store => store.job)

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16'>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800'>
        <span className='text-[#6A38c2]'>Latest & Top </span>Job Openings
      </h1>

      {/* Responsive grid for job cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
        {
          jobs.length <= 0 ? (
            <span className='text-gray-500 text-sm'>No Job Available</span>
          ) : (
            jobs.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))
          )
        }
      </div>
    </div>
  )
}

export default LatestJobs
