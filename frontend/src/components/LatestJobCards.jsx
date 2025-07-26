import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function LatestJobCards({ job }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className='p-4 sm:p-5 rounded-xl shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-200'
    >
      {/* Top Section - Company Info */}
      <div className='mb-2'>
        <h1 className='font-semibold text-base sm:text-lg text-gray-800 truncate'>
          {job?.company?.name}
        </h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>

      {/* Title & Description */}
      <div>
        <h2 className='font-bold text-base sm:text-lg text-gray-900 mb-1'>
          {job?.title}
        </h2>
        <p className='text-sm text-gray-600 line-clamp-2'>
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className='flex flex-wrap items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-semibold' variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className='text-[#F83002] font-semibold' variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className='text-[#7209b7] font-semibold' variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
