import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async (data) => {
    setLoading(true);
   try {
      await axios.post('https://backend-stockify.onrender.com/api/users/register', data);
      alert('Signed up successfully!');
      navigate('/login');
    } catch (error) {
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
          
           <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
            {loading ? "Signing up..." : "SignUp"}
          </button>
        </form>
        
        <div className="text-center mb-2">Already have an account?</div>
        <Link to="/login" className="btn btn-outline-success w-100">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
