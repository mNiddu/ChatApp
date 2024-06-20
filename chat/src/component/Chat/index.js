import React from 'react'

import ChatList from './ChatList/ChatList'
import Chat from './Chats/chat'
import './index.css'

export default function Index(){
    return(
        <div className="chat-container">
           
            <div className="chat-list">
        <ChatList/>
            </div>
            <div className="chat-page">
        <Chat/>
            </div>
        </div>
    )
}