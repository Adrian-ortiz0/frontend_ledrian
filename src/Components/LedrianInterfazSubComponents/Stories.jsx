import React from 'react'

const Minihistory = (size) => {
  return (
    <div className='h-[70px] w-[70px] bg-white rounded-full'></div>
  )
}

export const Stories = () => {
  return (
    <div className='flex w-full '>
      <Minihistory/>
      <Minihistory/>
      <Minihistory/>
      <Minihistory/>
      <Minihistory/>
      <Minihistory/>
    </div>
  )
}
