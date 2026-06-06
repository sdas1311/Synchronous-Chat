import { useAppstore } from '@/store';
import moment from 'moment';
import React, { useEffect } from 'react'

const MessageContainer = () => {
  const scrollRef = React.useRef();
  const {selectedChatType, selectedChatData, selectedChatMessages } =useAppstore();
  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [selectedChatMessages])
  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((msg) => {
      const messageDate = moment(msg.timestamp).format('YYYY-MM-DD');
      const showDate = !lastDate || messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={msg._id}>
          {showDate && (
            <div className='text-center text-sm text-gray-500 my-2'>
              {moment(msg.timestamp).format("LL")}
            </div>
          )}
          {
            selectedChatType === 'contact' && renderDMMessages(msg)
          }
        </div>
      )
    })
  };

  const renderDMMessages = (message) =>{
    return (
      <div className={`${message.sender === selectedChatData._id
        ? "text-left"
        : "text-right"}`}
      >
        {message.messageType === 'text' && (
        <div className={`${
          message.sender !== selectedChatData._id 
          ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" 
          : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
        } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
          {message.content}
        </div>
        )}
        <div className='text-xs text-gray-600'>
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };
  return (
    <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw]' ref={scrollRef}>
      {renderMessages()}
      <div ref={scrollRef}/>
    </div>
  )
}

export default MessageContainer