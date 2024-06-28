import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Navbar from "../Navbar/Navbar";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { ReactComponent as Mic } from "../../Images/mic.svg";
import { ReactComponent as Emoji } from "../../Images/emoji.svg";
import { ReactComponent as File } from "../../Images/file.svg";
import { ReactComponent as Send } from "../../Images/send.svg";
import {IconButton} from  '@mui/material'

export default function Chat() {
  const textareaRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const textarea = textareaRef.current;
    const handleInput = () => {
      textarea.style.height = 'auto'; // Reset the height
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Set the height to the scrollHeight or max-height
    };

    // Initial resize to fit content if any
    handleInput();

    // Attach event listener
    textarea.addEventListener('input', handleInput);

    return () => {
      textarea.removeEventListener('input', handleInput);
    };
  }, []);

  const addEmoji = (emoji) => {
    const emojiText = emoji.apple;
    setText(text + emojiText);
  };

  const handle=()=>{
    alert(11)
  }
  return (
    <div className="chat-main">
      <div className="chat-nav">
        <Navbar />
      </div>
      <div className="chat-msg">
        <div className="chat-dates">
          <h6>Today, Jun 10</h6>
        </div>
        <div className="chat-messages">
          <div className="left-msg">
            <ul>
              <li>
                To address the issue of the chat page becoming congested when
                messages are lengthy, we need to ensure that the .chat-page and
                its contents are properly handled to maintain their layout and
                avoid pushing other elements.
                <span className="msg-time">2:38 PM</span>
              </li>
            </ul>
          </div>
          <div className="right-msg">
            <ul>
              <li>
                Hii Suresh
                <span className="msg-time">2:38 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="chat-type">
        <div className="chat-icon">
          <Mic />
          <textarea
            ref={textareaRef}
            placeholder="Type something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="iconify">
        <button>  <Emoji onClick={() => setShowEmojiPicker(!showEmojiPicker)} /></button>
            {showEmojiPicker && (
            <div style={{ position: 'absolute', bottom: '80px', right: '50px', zIndex: 1 }}>
              <Picker data={data} onEmojiSelect={addEmoji} />
            </div>
          )}
    


         <button > <File /></button>
         <button  className={text ?"submit":"disable"}  disabled={!text} onClick={handle}> <Send /></button>
          
        </div>
      </div>
    </div>
  );
}
