import React from 'react';
import './Chat.css';
import Navbar from '../Navbar/Navbar';

export default function Chat() {
  return (
    <div className='chat-main'>
      <div className='chat-nav'>
        <Navbar />
      </div>
      <div className='chat-msg'>
        <div className='chat-dates'>
          <h6>Today, Jun 10</h6>
        </div>
        <div className='chat-messages'>
          <div className='left-msg'>
            <ul>
              <li>
                To address the issue of the chat page becoming congested when messages are lengthy, we need to ensure that the .chat-page and its contents are properly handled to maintain their layout and avoid pushing other elements.
                To address the issue of the chat page becoming congested when messages are lengthy, we need to ensure that the .chat-page and its contents are properly handled to maintain their layout and avoid pushing other elements.
                <span className="msg-time">2:38 PM</span>
              </li>
            </ul>
          </div>
          <div className='right-msg'>
            <ul>
              <li>
                Hii Suresh
                <span className="msg-time">2:38 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
