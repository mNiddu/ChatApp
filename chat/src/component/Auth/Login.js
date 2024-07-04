import React, { useState,useEffect } from "react";
import "./Login.css";
import LoginLogo from "../Images/Login.jpeg";
import * as Yup from "yup";
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { LoginToken } from '../Redux/LoginRedux/Action';
  import { useSelector, useDispatch } from 'react-redux';
export default function Login() {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [count,setCount]=useState(false)
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}[<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const newError={...error}
    delete newError[name];
    setError(newError);
  };
  useEffect(() => {
    const savedToken = JSON.parse(localStorage.getItem('UserToken'));
    if (savedToken) {
      dispatch(LoginToken(savedToken));
    }
  }, [count]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setError({});
      const response = await axios.post('http://localhost:5000/api/Chat/login',formData)
      if(response.data.success==true) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });
          setCount(!count)
          localStorage.setItem('UserToken',JSON.stringify(response.data.UserToken))
         
          setTimeout(()=>{
            navigate('/')
          },1000)
      }else{
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });
         
      }
    } catch (err) {
     if(err instanceof Yup.ValidationError){
      const newError = {};
      err.inner.forEach((element) => {
        newError[element.path] = element.message;
      });
      setError(newError);
    }else{
      console.log(err)
    }
     }
  };

  return (
    <div className="login-container">
       <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
{/* Same as */}
<ToastContainer />
      <div className="login-card">
        <div className="login-main">
          <div className="login-top">
            <h4>Welcome Back!</h4>
            <p>Please enter your login details below</p>
          </div>
          <form className="login-content" onSubmit={handleSubmit}>
            <div className="login-inputs">
              <input
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                value={formData.email}
              />
              {error.email && <p className="error-message">{error.email}</p>}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                value={formData.password}
              />
              {error.password && <p className="error-message">{error.password}</p>}
              </div>
              <div className="login-inputs1">
              <a href="">Forget password?</a>
              <button type="submit">Sign in</button>
              </div>

            <div className="google-btn">
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="login-image">
          <img src={LoginLogo} alt="Login-Image" />
        </div>
      </div>
    </div>
  );
}
