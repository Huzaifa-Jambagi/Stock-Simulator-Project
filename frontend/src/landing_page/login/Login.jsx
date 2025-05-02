import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function
  
  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError('');
    try {
      const res = await axios.post('https://backend-stockify.onrender.com/api/users/login', data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      
      // Since you're navigating to a different domain, window.location.href is the right choice
      window.location.href = `https://stock-simulator-dashboard.vercel.app/?token=${token}`;
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        setLoginError('Invalid username or password');
      } else {
        setLoginError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'white' }}>
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter Email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <span className="text-danger">Valid email required</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter Password"
              {...register('password', { required: true })}
            />
            {errors.password && <span className="text-danger">Password required</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          {loginError && (
            <div className="alert alert-danger text-center" role="alert">
              {loginError}
            </div>
          )}
        </form>
        <div className="text-center mb-2">Don't have an account?</div>
        {/* Use Link component from react-router-dom for internal navigation */}
        <Link to="/register" className="btn btn-outline-success w-100">SignUp</Link>
      </div>
    </div>
  );
}

export default Login;
