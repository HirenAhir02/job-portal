import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router'

function Job({ job }) {
  const navigate = useNavigate()

  const dayAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentDate = new Date()
    const timeDifference = currentDate - createdAt
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    return daysAgo === 0 ? "Today" : `${daysAgo} days ago`
  }

  return (
    <div className="p-5 rounded-xl shadow-md bg-white border border-gray-100 transition hover:shadow-lg">
      {/* Top Row */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>{dayAgoFunction(job?.createdAt)}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-4">
        <div className="p-2 border rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={job?.company?.logo} alt="Company Logo" />
          </Avatar>
        </div>
        <div>
          <h1 className="font-semibold text-base">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-semibold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white w-full sm:w-auto">
          Save For Later
        </Button>
      </div>
    </div>
  )
}

export default Job
