import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Badge,
  Alert,
  Modal,
  Box,
} from '@mui/material/';
import * as Yup from 'yup';
import axios from 'axios';
import './ChatList.css';
import { ReactComponent as Notification } from '../../Images/noti.svg';
import { ReactComponent as Correct } from '../../Images/correct.svg';
import { ReactComponent as Wrong } from '../../Images/wrong.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';
import { GetContact } from '../../Redux/ContactList/Action';
import moment from 'moment'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const socket = io('http://localhost:5000');

export default function ChatList() {
  const dispatch = useDispatch()
  const UserToken = useSelector((state) => state.loginId);
  const ContactList=useSelector((state)=>state.contactList)
  console.log(ContactList,'ContactList')
  const [count, setCount] = useState(false);
  const [requested, setRequested] = useState([]);
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState({ phone: '' });
  const [Error, setError] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [status,setStatus]=useState('pending')
  const [notifycount, setNotifyCount] = useState(requested?.findContact?.length || 0);


  useEffect(() => {
    axios
      .get('http://localhost:5000/api/usercontact/getcontact', {
        headers: { 'auth-token': UserToken.token },
      })
      .then((res) => {
        setRequested(res.data);
        dispatch(GetContact(res.data))
      })
      .catch((err) => {
        console.log(err);
      });

    socket.on('contactRequest', (data) => {
      toast.info(data.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
    });

    return () => {
      socket.off('contactRequest');
    };
  }, [dispatch]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setNotifyCount(0);
  };

  const ValidationSchema = Yup.object({
    phone: Yup.string()
      .required('Phone Number required')
      .min(10, 'Enter ten digits Number')
      .matches(/[0-9]/, 'Enter Only Number'),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const HandleContact = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value.trim() });
    setError({});
  };
  const HandleAddContact = async () => {
    try {
      await ValidationSchema.validate(contact, { abortEarly: false });
      setError({});

      const response = await axios.post(
        'http://localhost:5000/api/usercontact/contact',
        contact,
        { headers: { 'auth-token': UserToken.token } }
      );
     
        toast.error(response.data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
      if (response.data.success === true) {
        toast.success(response.data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
        setOpen(!open);
        setCount(!count);
      } else {
        toast.error(response.data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setError(validationErrors);
      } else {
        console.log(err);
      }
    }
  };


  const HandleClick = (index,value) => {
    setActiveIndex(index);
    const val=value.toLowerCase();
    setStatus(val);
    
  };

  const HandleRequest=(id,value)=>{
    axios.post('http://localhost:5000/api/usercontact/request',{id,value})
    .then((response)=>{
      if (response.data.success === true) {
        toast.success(response.data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
      
      } else {
        toast.error(response.data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const HandleSearch = (e) => {
    const { value } = e.target;
    
    const filteredList = requested.findContact.filter((data) => {
      return data.UserId.name.toLowerCase().includes(value.toLowerCase())
    });
  
    
    console.log(filteredList, 'FilteredList');
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="chat-top">
        <h5>Chats</h5>
        <div className="chat-icon">
          <IconButton onClick={handleOpen}>
            <AddCircleOutlineIcon />
          </IconButton>
          <div className="notificatoin-center">
            <IconButton onClick={handleNotificationClick}>
            <Badge badgeContent={notifycount} color="primary">
  <Notification color="action" />
</Badge>
           
            </IconButton>
            {showNotifications && (
              <div className="notifications">
                <div className="check-status">
                  {['Pending', 'Accepted', 'Rejected', 'Sent Request'].map((status, index) => (
                    <p key={index} onClick={() => HandleClick(index,status)} className={activeIndex === index ? 'active' : ''}>
                      {status}
                    </p>
                  ))}
                </div>
                {requested?.findContact?.filter((value) => value.status === status).length === 0 ? (
  <div style={{padding:'10px'}}><Alert severity="error" style={{display:'flex',justifyContent:'center'}}>No {status} Contact</Alert></div>
) : (
  requested.findContact.filter((value) => value.status === status).map((data) => (
    <div className="notification" key={data._id}>
      <div className="notify-lists">
        <div className="notify-chats">
          <img
            src={`http://localhost:5000/api/profile/${data.UserId.image}`}
            alt="Profile"
          />
          <div className="notify-list">
            <h6>{data.UserId.name}</h6>
            <p>{data.UserId.phone}</p>
          </div>
        </div>
        <div className="notify-date">
          <div className="status">
           {status=='pending' && (<><IconButton onClick={() => HandleRequest(data._id, 'accepted')}>
              <Correct />
            </IconButton>
            <IconButton onClick={() => HandleRequest(data._id, 'rejected')}>
              <Wrong />
            </IconButton></>)}
           {status=='accepted' && (<><Button size='small' startIcon={<Correct />}>
             Accepted
            </Button>
          </>)}
           {status=='rejected' && (<> <Button size="small" startIcon={<Wrong />}>
      Rejected
    </Button>
          </>)}
          </div>
          <h6>{formatDistanceToNow(parseISO(data.date), { addSuffix: true })}</h6>
        </div>
      </div>
    </div>
  ))
)}

                
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="chat-search">
        <TextField
          type="search"
          placeholder="Search"

          onChange={HandleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
          variant="outlined"
          className="textField"
        />
      </div>
     {requested?.findContact?.length == 0 ? <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>No Contact is Added</div>: 
    <> {requested?.findContact?.filter((value)=>value.status=='accepted')?.map((data,index)=>(
      <div className="chat-lists" key={index}>
      <div className="chats">
        <img
          src={`http://localhost:5000/api/profile/${data.UserId.image}`}

            alt="Profile"
        />
        <div className="list">
        <h6>{data.UserId.name}</h6>

          <p>Hello how r u</p>
        </div>
      </div>
      <div className="chat-date">
        <h6>{moment(data.date).format('LT')}</h6>
      </div>
    </div>
    ))}</>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="model-main">
            <div className="heading">Add Contact</div>
            <input
              type="tel"
              name="phone"
              onChange={HandleContact}
              placeholder="Enter Phone Number"
            />
            {Error.phone && (
              <p style={{ color: 'red', margin: 0, fontSize: '1.rem' }}>
                {Error.phone}
              </p>
            )}
            <button onClick={HandleAddContact}>Add Contact</button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
