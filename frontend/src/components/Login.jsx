import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password
    };

    try {
      const res = await axios.post("https://pageunlockbackend.onrender.com/user/login", userInfo);
     
      if (res.data) {
        toast.success("Logged in successfully"); // Use toast for success message
        document.getElementById("my_modal_3").close()
        setTimeout(()=>{

        window.location.reload();
        localStorage.setItem("user", JSON.stringify(res.data)); // Store user data
      

      },1000);
    
      }
    } catch (error) {
      toast.error("Error: " + error.response?.data?.message || "Login failed"); // Use toast for error message
    setTimeout(()=>{},2000);
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>document.getElementById("my_modal_3").close()}>✕</Link>
            <h3 className='font-bold text-lg'>Login</h3>
            <div className='mt-4 space-y-2'>
              <span>Email</span>
              <br/>
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
              <br/>
              <input 
                type="password" 
                {...register("password", { required: true })} 
                placeholder='Enter your password' 
                className='w-80 px-3 border rounded-md outline-none'
              />
              {errors.password && <p className="text-red-500">Password is required.</p>}
            </div>
            <div className="flex justify-around mt-4">
              <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">Login</button>
              <p>Not registered? 
                <Link to="/signup" className='underline text-blue-500 cursor-pointer ml-1'>Signup</Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
