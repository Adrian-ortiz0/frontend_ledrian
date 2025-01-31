import React from 'react'
import { SearchInput } from './SearchInput'

export const HeaderNav = ({usuario}) => {
  return (
    <header className='h-[10%] flex justify-between items-center bg-[#0d0d0d00] shadow-lg w-full '>
        {/*<NavProfile usuario={usuario} />*/}
        <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 italic font-bold pl-[2vw]">Ledrian</span>

        <SearchInput />
        {/*<Nav usuario={usuario} />*/}
    </header>
  )
}
