import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { CreateModal } from '../CreateModal'

const IconButton = ({ imagePath, onClickFunction }) => {
  return (
    <button className='bg-transparent border-none text-white cursor-pointer transition duration-300 rounded-full p-3 w-12 h-12 hover:bg-[#ffffff30]' onClick={onClickFunction}>
      <img className='w-full h-full object-contain' src={imagePath} alt="icon" />
    </button>
  );
};

export const Nav = ({usuario}) => {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleCreate = () => {
    setIsCreateModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsCreateModalOpen(false)
  }

  const navigate = useNavigate();

  return (
    <nav className='flex justify-center items-center h-full'>
        <IconButton 
        imagePath="/public/home_icon.png" 
        onClickFunction={() => navigate('/home')} 
      />
      <IconButton 
        imagePath="/public/tabs_icon.png" 
        onClickFunction={handleCreate} 
      />
      <IconButton 
        imagePath="/public/notification_icon.png" 
        onClickFunction={() => console.log('Notification clicked!')} 
        buttonClass="w-5 h-5" 
      />
        {isCreateModalOpen && (
            <CreateModal onClose={handleCloseModal} usuario={usuario} />
        )}
    </nav>
  )
}
