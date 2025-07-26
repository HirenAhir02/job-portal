import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector(store => store.job)

  return (
    <div className="w-full overflow-x-auto px-4 py-6">
      <div className="min-w-[600px] md:min-w-full">
        <Table>
          <TableCaption className="text-sm text-gray-500 mt-2">
            A list of your applied jobs
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              allAppliedJobs.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                    You haven't applied for any jobs.
                  </TableCell>
                </TableRow>
              ) : (
                allAppliedJobs.map((appliedJob) => (
                  <TableRow key={appliedJob?._id}>
                    <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                    <TableCell>{appliedJob?.job?.title}</TableCell>
                    <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={
                        appliedJob?.status === "rejected"
                          ? 'bg-red-600'
                          : appliedJob?.status === "pending"
                            ? 'bg-gray-600'
                            : 'bg-green-600'
                      }>
                        {appliedJob?.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AppliedJobTable
