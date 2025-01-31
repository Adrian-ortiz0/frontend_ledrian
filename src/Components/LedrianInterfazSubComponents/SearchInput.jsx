import React from 'react'

export const SearchInput = () => {
  return (
    <div className='flex justify-center items-center h-full gap-5'>
        <img src="/public/logo_icon.png" alt="" width={20} height={20} />
        <input className='border-none rounded-lg bg-[#ffffff18] text-white text-sm pl-4 pr-4 py-2 outline-none focus:ring-2 focus:white focus:ring-opacity-50 transition-all duration-200 h-[60%] shadow-sm' type="text" placeholder='Search...'/>
    </div>
  )
}
