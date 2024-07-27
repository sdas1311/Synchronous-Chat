import { useAppstore } from '@/store'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const Profile = () => {
  const navigate = useNavigate();
  const {userInfo, setUserInfo}=useAppstore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setselectedColor] = useState(0);
  const saveChanges = async () => {};
  return (
    <div className='bg-[#1b1c24] h-screen flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max' >
        <div>
          <IoArrowBack className='text-white/90 text-4xl lg:text-6xl cursor-pointer'  />
        </div>
        <div className='grid grid-cols-2' >
          <div className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center' >
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile