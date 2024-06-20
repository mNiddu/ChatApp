import React from 'react';
import './Navbar.css';
import { ReactComponent as Camera } from '../../Images/camera.svg';
import { ReactComponent as Phone } from '../../Images/phone.svg';
import { ReactComponent as More } from '../../Images/more.svg';

export default function Navbar() {
  return (
    <div className='nav-main'>
      <div className='nav-page'>
        <div className='nav-image'>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s" 
            alt="Suresh Kumar Profile"
          />
        </div>
        
        <div className='nav-name'>
          <h6>Suresh Kumar</h6>
          <p>Online</p>
        </div>
      </div>
      <div className='nav-icon'>
        <Camera />
        <Phone />
        <More />
      </div>
    </div>
  );
}
