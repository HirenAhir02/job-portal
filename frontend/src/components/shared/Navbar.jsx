import React from 'react'
import { Link, useNavigate } from 'react-router'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { setUser } from '../../redux/authSlice'

function Navbar() {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white shadow-sm'>
            <div className='flex flex-wrap items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4'>
                {/* Logo */}
                <h1 className='text-2xl font-bold'>
                    Job <span className='text-[#F83002]'>Portal</span>
                </h1>

                {/* Nav Links */}
                <ul className='hidden md:flex items-center gap-5 font-medium'>
                    {
                        user && user.role === "recruiter" ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                            </>
                        )
                    }
                </ul>

                {/* Auth Buttons / Profile */}
                <div className='flex items-center gap-2 mt-4 md:mt-0'>
                    {
                        !user ? (
                            <>
                                <Link to="/login">
                                    <Button variant='outline' className='w-full md:w-auto'>Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className='bg-[#6A38C2] hover:bg-[#5b30a6] w-full md:w-auto'>
                                        Signup
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-72'>
                                    <div className='flex gap-4'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user.fullname} 👋</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2 my-4 text-gray-700'>
                                        {
                                            user.role === "student" && (
                                                <div className='flex items-center gap-2'>
                                                    <User2 className="w-4 h-4" />
                                                    <Link to="/profile">
                                                        <Button variant="link" className="p-0 h-auto text-sm">View Profile</Button>
                                                    </Link>
                                                </div>
                                            )
                                        }
                                        <div className='flex items-center gap-2'>
                                            <LogOut className="w-4 h-4" />
                                            <Button onClick={logoutHandler} variant="link" className="p-0 h-auto text-sm">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
