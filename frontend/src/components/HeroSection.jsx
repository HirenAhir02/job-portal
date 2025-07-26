import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setsearchQuery } from '../redux/jobSlice'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setsearchQuery(query))
    navigate("/browse")
  }

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 my-12 max-w-3xl mx-auto">
        <span className="mx-auto px-4 py-1.5 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium architecto explicabo, molestiae vero non aliquam!
        </p>

        <div className="flex w-full sm:w-[90%] md:w-[70%] lg:w-[60%] mx-auto shadow-lg border border-gray-200 pl-3 rounded-full bg-white">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your Dream Job"
            className="flex-1 outline-none border-none px-2 py-2 rounded-l-full text-sm sm:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#5A38C2] text-white"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
