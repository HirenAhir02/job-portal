import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Download, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'

const shortlistingStatus = ['Accepted', 'Rejected']

function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application)

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {
        status
      })
      if (res.data.message) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  const applications = applicants?.applications || []

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.length > 0 ? (
            applications.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.applicant?.fullname || 'NA'}</TableCell>
                <TableCell>{item?.applicant?.email || 'NA'}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || 'NA'}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="flex items-center gap-2 text-blue-600"
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.applicant.profile.resumeOriginalName}
                      <Download className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="font-bold">NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.createdAt?.split('T')[0] || 'NA'}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          className="flex items-center gap-2 my-2 cursor-pointer hover:underline"
                          key={index}
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
