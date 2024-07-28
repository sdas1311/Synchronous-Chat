import { useAppstore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactsContainer from './components/ContactsContainer';
import EmptyChatContainer from './components/EmptyChatContainer';
import ChatContainer from './components/chat-container/ChatContainer';

const Chat = () => {

  const {userInfo} = useAppstore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("Please complete your profile setup to continue");
      navigate('/profile');
    }
},[userInfo, navigate])
  

  return (
    <div  className='flex h-[100vh] text-white overflow-hidden' >
      <ContactsContainer />
      {/* <EmptyChatContainer /> */}
      <ChatContainer />
    </div>
  )
}

export default Chat