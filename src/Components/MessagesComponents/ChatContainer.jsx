import React from 'react'
import { useNavigate } from 'react-router';

export const ChatContainer = ({usuario}) => {

  return (
    <section className='chat_container'>
        <div className='chat_container-profileInfo'>Profile Info</div>
        <div className='chat_container-messages'>Messages</div>
        <div className='chat_container-input'>ChatInput</div>
    </section>
  )
}
