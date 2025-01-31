import React from 'react'
import { SearchInput } from './SearchInput'
import { Nav } from './Nav'
import { NavProfile } from './NavProfile'

export const HeaderNav = ({usuario}) => {
  return (
    <header className='h-[10%] flex justify-between items-center bg-[#0d0d0d] shadow-lg w-full '>
        <NavProfile usuario={usuario} />
        <SearchInput />
        <Nav usuario={usuario} />
    </header>
  )
}
