import React,{useState} from 'react'
import './Register.css'
import RegisterLogo from '../Images/Register.png'
import {Link} from 'react-router-dom'
import * as Yup from 'yup'
export default function Register() {
  const [data,setData]=useState({
    name:"",
    email:"",
    phone:"",
    password:""
  })
  const [error,setError]=useState({})
  const HandleChange=(e)=>{
    const {name,value}=e.target;
    setData({...data,[name]:value})
    // setError((prevError) => {
    //   const newError = { ...prevError };
    //   delete newError[name];
    //   return newError;
    // });
    const newError={...error}
    delete newError[name];
    setError(newError)
  }

  const validationShcema = Yup.object({
    name:Yup.string().required("Name is required"),
    email:Yup.string().required("Email is required").email("Invalid email required"),
    phone:Yup.string().required("Phone Number required").min(10,"Enter ten degits Number").matches(/[0-9]/,"Enter Only Number"),
    password:Yup.string().required("Password is required").min(8,"Password must be at least 8 characters").matches(
      /[!@#$%^&*(),.?":{}[<>]/,
      "Password must contain at least one symbol"
    )   .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  })
  const HandleSubmit=async()=>{
   
    try{
      await validationShcema.validate(data,{abortEarly:false})
      setError({})
      console.log("Form submitted successfully");
      alert(1)
    }
    catch(err){
      const newError={}
      err.inner.forEach((ele)=>{
        newError[ele.path]=ele.message;
      })
      setError(newError)
    }
  }
  return (
    <div className='reg-container'>
      <div className='reg-card'>
        <div className='reg-main'>
          <div className='reg-top'>
            <h4>Welcome To ChatApp</h4>
            <p>Please register your details below</p>
          </div>
          <div className='reg-input'>
            <input type='text' name="name" onChange={HandleChange} placeholder='Enter your Name' />
            {error.name && <p className="error-message">{error.name}</p>}

            <input type='email' name="email" onChange={HandleChange} placeholder='Enter your Email' />
            {error.email && <p className="error-message">{error.email}</p>}

            <input type='tel' name="phone" onChange={HandleChange} placeholder='Enter your Phone' />
            {error.phone && <p className="error-message">{error.phone}</p>}

            <input type='password'name="password" onChange={HandleChange} placeholder='Enter your Password' />
            {error.password && <p className="error-message">{error.password}</p>}

            <button onClick={HandleSubmit}>Sign up</button>
          </div>
          <div className='reg-bottom'>
            <p>Already have an account? <Link to='/'>Sign up</Link></p>
          </div>
        </div>
      <div className='reg-image'>
        <img src={RegisterLogo} alt='RegisterLogo'/>
      </div>
      </div>
    </div>
  )
}
