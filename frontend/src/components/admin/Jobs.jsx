import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import AddminJobsTable from './AddminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setsearchJobByText } from '../../redux/jobSlice'
import { useNavigate } from 'react-router'

function Jobs() {
 useGetAllAdminJobs();
    const [input, setInput] = useState ("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
      dispatch(setsearchJobByText(input))
    },[input])
  return (
    <div>
        <Navbar></Navbar>
        <div className=' max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                 <Input
                className='w-fit'
                placeholder='Filter By Name & Role'
                onChange={(e) => setInput(e.target.value)}
            />
            <Button className='cursor-pointer' onClick={()=> navigate("/admin/jobs/create")}>Post New Jobs</Button>
            </div>
           <AddminJobsTable/>

        </div>
    </div>
  )
}

export default Jobs