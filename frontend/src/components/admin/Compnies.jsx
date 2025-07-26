import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { searchCompanyByText } from '../../redux/companySlice'

function Compnies() {
    const navigate = useNavigate();
    const [input, setInput] = useState ("");
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(searchCompanyByText(input))
    },[input])
  return (
    <div>
        <Navbar></Navbar>
        <div className=' max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                 <Input
                className='w-fit'
                placeholder='Filter By Name'
                onChange={(e) => setInput(e.target.value)}
            />
            <Button className='cursor-pointer' onClick={()=> navigate("/admin/companies/create")}>New Company</Button>
            </div>
           <CompaniesTable/>

        </div>
    </div>
  )
}

export default Compnies