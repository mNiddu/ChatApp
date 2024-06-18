import React, { useState } from "react";
import "./Login.css";
import LoginLogo from "../Images/Login.jpeg";
import * as Yup from "yup";
import {Link} from 'react-router-dom'
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setError({});
      // Submit form
      console.log("Form submitted successfully");
    } catch (err) {
      const newError = {};
      err.inner.forEach((element) => {
        newError[element.path] = element.message;
      });
      setError(newError);
    }
  };

  return (
    <div className="login-container">
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
