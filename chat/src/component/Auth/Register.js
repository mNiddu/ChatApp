import React,{useState} from 'react'
import './Register.css'
import RegisterLogo from '../Images/Register.png'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ProfileBtn} from '../Images/profile.svg'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import axios from 'axios'

export default function Register() {
  const navigate = useNavigate();
  const [data,setData]=useState({
    name:"",
    email:"",
    phone:"",
    password:""
  })
  const[Profile,setProfile]=useState({})
  const [error,setError]=useState({})
  console.log(data,'data')
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

  const HandleImage=(e)=>{
    const file=e.target.files[0];
    setProfile(file)
    console.log(file,'file')
  }

  const HandleButtonClick=()=>{
    document.getElementById('file-input').click();
  }
  const validationSchema = Yup.object({
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
  const HandleSubmit = async () => {
    try {
      await validationSchema.validate(data, { abortEarly: false });
      setError({});

          const formData=new FormData();

      console.log([formData],'formData');
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('password', data.password)
      formData.append('profile', Profile)

     
      const response = await axios.post('http://localhost:5000/api/Chat/register',formData);
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
          setTimeout(()=>{
            navigate('/login')
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
          setTimeout(()=>{
            navigate('/login')
          },1000)
      }

      // Handle success response
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newError = {};
        err.inner.forEach((error) => {
          newError[error.path] = error.message;
        });
        setError(newError);
      } else {
        // Handle other errors
        console.error('Error submitting the form', err);
      }
    }
};

  return (
    <div className='reg-container'>
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

            <div  ><input type='file' id='file-input'  style={{display:'none'}} name="profile" onChange={HandleImage} placeholder='Upload Profiles' />

            <input type='text' onClick={HandleButtonClick} value={Profile ? Profile.name:''} style={{cursor:'pointer'}} placeholder='Upload Profile' readOnly/>
            {/* <button  onClick={HandleButtonClick}><ProfileBtn/></button> */}
            {error.email && <p className="error-message">{error.email}</p>}</div>

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
