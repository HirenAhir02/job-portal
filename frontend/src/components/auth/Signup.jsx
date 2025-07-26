import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'

function Signup() {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("fullname", input.fullname);
        formdata.append("email", input.email);
        formdata.append("phoneNumber", input.phoneNumber);
        formdata.append("password", input.password);
        formdata.append("role", input.role);
        if (input.file) {
            formdata.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className='flex justify-center px-4'>
                <form
                    onSubmit={submitHandler}
                    className='w-full max-w-md bg-white border border-gray-200 rounded-md p-6 my-10 shadow-sm'
                >
                    <h1 className='font-bold text-xl mb-5 text-center'>Signup</h1>

                    <div className='mb-4'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            placeholder="meet"
                            value={input.fullname}
                            name='fullname'
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='mb-4'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="meet1@.com"
                            value={input.email}
                            name='email'
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='mb-4'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            placeholder="9212223322"
                            value={input.phoneNumber}
                            name='phoneNumber'
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='mb-4'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="meet12@"
                            value={input.password}
                            name='password'
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='flex flex-wrap gap-4 items-center mb-4'>
                        <RadioGroup className='flex gap-4'>
                            <div className="flex items-center gap-2">
                                <Input
                                    type='radio'
                                    name="role"
                                    value="student"
                                    className='cursor-pointer'
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input
                                    type='radio'
                                    name="role"
                                    value="recruiter"
                                    className='cursor-pointer'
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className='flex items-center gap-2 w-full sm:w-auto'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type='file'
                                className='cursor-pointer'
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>

                    {
                        loading ? (
                            <Button className='w-full my-2' disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please Wait
                            </Button>
                        ) : (
                            <Button type='submit' className='w-full my-2'>
                                Signup
                            </Button>
                        )
                    }

                    <p className='text-sm mt-2 text-center'>
                        Already have an account?
                        <Link to="/login" className='text-blue-600 ml-1'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
