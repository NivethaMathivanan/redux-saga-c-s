import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myImage from "../myImage/Free Vector _ Illustration with programmer working.jpeg";
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import "./login.css";
const Login = ({ onLogin }) => {
  const defaultUsername = "NivethaMathivanan";
  const defaultPassword = "NiveMathi66";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateCredentials = () => {
    return username === defaultUsername && password === defaultPassword;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateCredentials()) {
      toast.success("Login successful!");

     
      setTimeout(() => {
        onLogin();
        navigate('/form');
      }, 2000); 
    } else {
      toast.error("Invalid username or password!");
    }
  };

  return (
    <div className='head'>
    <div className="login-page container-fluid">
      <div className="login-container row">
       
        <div className="col-lg-6 login-image">
          <img
            src={myImage}
            alt="Social Media Marketing"
            className="img-fluid"
          />
        </div>

    
        <div className="col-lg-6 login-form d-flex flex-column justify-content-center">
          <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

          <h2 className="text-center mb-3">Hello Again!</h2>
          <p className="text-center">Welcome back, you've been missed!</p>

          <form onSubmit={handleLogin} autoComplete="off" className="px-4">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Enter Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            <div className="d-flex justify-content-between">
              <a href="/recovery" className="text-muted">Recovery Password</a>
            </div>

            <button type="submit" className="signB w-100 mt-4">
              Sign In
            </button>

            <h6 className="text-center mt-5"><strong>Or Continue With</strong></h6>
            <div className="d-flex justify-content-center mt-3">
              <a href="https://www.apple.com" target="_blank" rel="noopener noreferrer">
                <FaApple size={40} color="grey" className="mx-3" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={40} color="grey" className="mx-3" />
              </a>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                <FaGoogle size={40} color="grey" className="mx-3" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
