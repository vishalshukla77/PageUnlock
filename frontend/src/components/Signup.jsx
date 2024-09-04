import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios'; // Import axios
import Login from './Login';
import { toast } from 'react-hot-toast';

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password
    };
    
    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      console.log(res.data);
      if (res.data) {
        toast.success("Signed in successfully");
        navigate(from, { replace: true });
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Error: " + error.response?.data?.message || "SignUp failed");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className="w-[600px]">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
            <h3 className='font-bold text-lg'>Signup</h3>

            <div className='mt-4 space-y-2'>
              <span>Name</span>
              <br />
              <input 
                type="text" 
                {...register("fullname", { required: true })} 
                placeholder='Enter your full name' 
                className='w-80 px-3 border rounded-md outline-none'
              />
              {errors.fullname && <p className="text-red-500">Name is required.</p>}
            </div>

            <div className='mt-4 space-y-2'>
              <span>Email</span>
              <br />
              <input 
                type="email" 
                {...register("email", { required: true })} 
                placeholder='Enter your email' 
                className='w-80 px-3 border rounded-md outline-none'
              />
              {errors.email && <p className="text-red-500">Email is required.</p>}
            </div>

            <div className='mt-4 space-y-2'>
              <span>Password</span>
              <br />
              <input 
                type="password" 
                {...register("password", { required: true })} 
                placeholder='Enter your password' 
                className='w-80 px-3 border rounded-md outline-none'
              />
              {errors.password && <p className="text-red-500">Password is required.</p>}
            </div>

            <div className="flex justify-around mt-4">
              <button 
                type="submit" 
                className={`bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200 ${loading ? 'cursor-not-allowed' : ''}`} 
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Signup'}
              </button>
              <p className='text-xl'>
                Have an account? 
                <button 
                  type="button" 
                  className='underline text-blue-500 cursor-pointer ml-1' 
                  onClick={() => document.getElementById("my_modal_3")?.showModal()}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Signup;
