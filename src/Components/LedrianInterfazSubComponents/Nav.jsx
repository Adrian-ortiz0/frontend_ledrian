import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { CreateModal } from '../CreateModal'

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
    <nav className='nav-container'>
        <button onClick={() => navigate('/home')}>
            <img src="/public/home_icon.png" alt="" width={20} height={20}/>
        </button>
        <button onClick={handleCreate}>
            <img src="/public/tabs_icon.png" alt="" width={20} height={20}/>
        </button>
        <button>
            <img src="/public/notification_icon.png" alt="" width={20} height={20}/>
        </button>
        {isCreateModalOpen && (
            <CreateModal onClose={handleCloseModal} usuario={usuario} />
        )}
    </nav>
  )
}
