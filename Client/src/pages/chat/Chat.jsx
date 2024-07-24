<<<<<<< HEAD
import React, { useEffect } from 'react'
import { useAppStore } from '../../store'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactsContainer from './components/contacts-container/ContactsContainer';
import EmptyChatContainer from './components/empty-chat-container/EmptyChatContainer';
import ChatContainer from './components/chat-container/ChatContainer';
const Chat = () => {
  
  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  useEffect(() => { 
    if(!userInfo.profileSetup){
      toast('Please setup your profile');
      navigate('/profile');
    }
  }, [userInfo,navigate])
=======
import React from 'react'
>>>>>>> parent of 20e151e (" day 3,4")

function Chat() {
  return (
<<<<<<< HEAD
    <div className='flex h-[100vh] text-white overflow-hidden ' >
      <ContactsContainer />
      
      {/*<EmptyChatContainer />*/}
      <ChatContainer />
    </div>
=======
    <div>Chat</div>
>>>>>>> parent of 20e151e (" day 3,4")
  )
}

export default Chat