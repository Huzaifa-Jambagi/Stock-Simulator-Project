 import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Login data:', data)
    await axios.post('https://backend-stockify.onrender.com/api/users/register',data);
    navigate('/login');
  }  
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'white' }}>
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">SignUp</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter Name"
              {...register('name', { required: true })}
            />
            {errors.name && <span className="text-danger">Name required</span>}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter Email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <span className="text-danger">Valid email required</span>}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter Password"
              {...register('password', { required: true })}
            />
            {errors.password && <span className="text-danger">Password required</span>}
          </div>
          
          <button type="submit" className="btn btn-success w-100 mb-3">SignUp</button>
        </form>
        
        <div className="text-center mb-2">Already have an account?</div>
        <a href="/login" className="btn btn-outline-success w-100">Login</a>
      </div>
    </div>
  );
}

export default Signup
