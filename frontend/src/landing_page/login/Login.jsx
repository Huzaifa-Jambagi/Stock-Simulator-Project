import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('Login data:', data)

    const res = await axios.post('http://localhost:3002/api/users/login', data);

    const token = res.data.token;

    localStorage.setItem("token", token)
   
    window.location.href = `http://localhost:5173/dashboard/?token=${token}`;
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

          <button type="submit" className="btn btn-success w-100 mb-3">Login</button>
        </form>

        <div className="text-center mb-2">Don't have an account?</div>
        <a href="/register" className="btn btn-outline-success w-100">SignUp</a>
      </div>
    </div>
  );
}

export default Login
