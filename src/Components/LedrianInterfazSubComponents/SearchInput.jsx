import React from 'react'

export const SearchInput = () => {
  return (
    <div className='search_input-container'>
        <img src="/public/logo_icon.png" alt="" width={20} height={20} />
        <input type="text" placeholder='Search'/>
    </div>
  )
}
