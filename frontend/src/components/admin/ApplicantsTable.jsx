import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Download, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';

const shortlistingstatus = ["Accepted", "Rejected"];
function ApplicantsTable() {
    const {applicants} = useSelector(store=>store.application); 

    const statusHandler = async (status,id) => {
        try {
            axios.defaults.withCredentials = true ;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status} );
            if(res.data.message){
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast(error?.response?.data?.message);
        }
    }
  return (
    <div>
        <Table>
            <TableCaption>A list of your recent applied user</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>FullName</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item)=>(
                            <tr key={item?._id}>
                        <TableCell>{item?.applicant?.fullname}</TableCell>
                        <TableCell>{item?.applicant?.email}</TableCell>
                        <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                        <TableCell >
                            {
                                item?.applicant?.profile?.resume ? <a className=' flex items-center gap-2 text-blue-600' href={item?.applicant?.profile?.resume} target='_blank' rel='noopener noreferer'>{item?.applicant?.profile?.resumeOriginalName} <Download className=''/></a> : <span className='font-bold'>NA</span>
                            }
                        </TableCell>
                        <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                        <TableCell className='float-right cursor-pointer'>
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal className='cursor-pointer'/>
                                </PopoverTrigger>
                                <PopoverContent className='w-32'>
 {
                             shortlistingstatus.map((status, index) => {
                                return (
                                    <div onClick={()=> statusHandler(status, item?._id)} className='flex w-fit items-center my-2 cursor-pointer' key={index}>
                                        <span>{status}</span>
                                    </div>
                                )
                                
                             })  
                           }
                                </PopoverContent>
                            </Popover>
                          
                        </TableCell>
                    </tr>
                        ))
                    }
                    
                </TableBody>
            
        </Table>
    </div>
  )
}

export default ApplicantsTable