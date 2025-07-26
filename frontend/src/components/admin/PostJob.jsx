import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { Loader2 } from 'lucide-react'

function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const { companies } = useSelector(store => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-8 mt-10 flex justify-center">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold mb-6 text-center">Post New Job</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input type="text" name="title" value={input.title} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Salary</Label>
              <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Experience</Label>
              <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Number Of Positions</Label>
              <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
            </div>
            {companies.length > 0 && (
              <div className="md:col-span-2">
                <Label>Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          value={company.name.toLowerCase()}
                          key={company._id}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          {loading ? (
            <Button className="w-full mt-6" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-6">
              Post New Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center mt-4">
              *Please register a company first before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostJob;
