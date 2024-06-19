import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton,TextField,InputAdornment } from '@mui/material/'
import './ChatList.css'

export default function ChatList(){
    return(
       <>
        <div className="chat-top">
            <h5>Chats</h5>
            <IconButton><AddCircleOutlineIcon/></IconButton>
        </div>
        <div className="chat-search">
            <TextField
                type="search"
                placeholder="Search"
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
        <div className="chat-lists">
           
            <div className="chats">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s" alt="Profile"/>
           
           <div className="list">
               <h6>Suresh Kumar</h6>
               <p>Hello how r u</p>
           </div>
            </div>
            
            <div className="chat-date">
                <h6>jan 6,2002</h6>
            </div>
            
        </div>
       </>
    )
}