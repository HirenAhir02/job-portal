import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'

function CompanyCreate() {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState('')
  const dispatch = useDispatch()

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      if (res?.data?.success) {
        toast.success('Company created successfully')
        dispatch(setSingleCompany(res.data.company))
        const companyId = res?.data?.company?._id
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mb-6">
          <h1 className="font-bold text-2xl sm:text-3xl">Your Company Name</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <div className="mb-6">
          <Label className="text-sm sm:text-base">Company Name</Label>
          <Input
            type="text"
            className="my-2 w-full"
            onChange={e => setCompanyName(e.target.value)}
            placeholder="jobhunt, google etc.."
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/companies')}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany} className="w-full sm:w-auto">
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
