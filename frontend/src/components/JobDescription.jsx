import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router'
import axios from 'axios'
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '../redux/jobSlice'
import { toast } from 'sonner'

function JobDescription() {
  const { id: jobId } = useParams()
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const isInitialyApplied = singleJob?.applications?.some(app => app.applicant === user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitialyApplied)

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })

      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id))
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-white transition ${
            isApplied
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-[#720967] hover:bg-[#5F32ad] cursor-pointer'
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Divider */}
      <h2 className="border-b-2 border-gray-300 font-semibold py-4 mt-8 text-lg">Job Description</h2>

      {/* Details */}
      <div className="space-y-4 text-sm sm:text-base mt-4 text-gray-800">
        <p><span className="font-bold">Role:</span> {singleJob?.title}</p>
        <p><span className="font-bold">Location:</span> {singleJob?.location}</p>
        <p><span className="font-bold">Description:</span> {singleJob?.description}</p>
        <p><span className="font-bold">Salary:</span> {singleJob?.salary} LPA</p>
        <p><span className="font-bold">Experience:</span> {singleJob?.experience} yrs</p>
        <p><span className="font-bold">Total Applicants:</span> {singleJob?.applications?.length}</p>
        <p><span className="font-bold">Posted Date:</span> {singleJob?.createdAt?.split("T")[0]}</p>
      </div>
    </div>
  )
}

export default JobDescription
