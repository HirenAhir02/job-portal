import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'

function Jobs() {
  const { jobs, searchQuery } = useSelector(store => store.job)
  const [filterJob, setFilterJob] = useState(jobs)

  useEffect(() => {
    if (searchQuery) {
      const filterdJobs = jobs.filter((job) =>
        job?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job?.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job?.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilterJob(filterdJobs)
    } else {
      setFilterJob(jobs)
    }
  }, [jobs, searchQuery])

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="w-full lg:w-1/4">
            <FilterCard />
          </div>

          {/* Job Cards */}
          {
            filterJob.length <= 0 ? (
              <div className="text-center text-gray-500 w-full pt-10">Job not Found</div>
            ) : (
              <div className="flex-1 h-[calc(100vh-160px)] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {
                    filterJob.map((job) => (
                      <Job key={job._id} job={job} />
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs
