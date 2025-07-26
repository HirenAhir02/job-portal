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
import { Loader2 } from 'lucide-react'
import { setLoading, setUser } from '../../redux/authSlice'

function Login() {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, user } = useSelector((store) => store.auth)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setUser(res.data.user))
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-[90vh] px-4 bg-gray-50">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white border border-gray-200 rounded-lg p-6 shadow-lg"
        >
          <h1 className="font-bold text-2xl mb-6 text-center">Login</h1>

          <div className="mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="meet1@example.com"
              value={input.email}
              onChange={changeEventHandler}
              required
            />
          </div>

          <div className="mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              value={input.password}
              onChange={changeEventHandler}
              required
            />
          </div>

          <div className="mb-4">
            <Label>Role</Label>
            <RadioGroup className="flex gap-6 mt-2">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  required
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full mt-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          )}

          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-600 underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
