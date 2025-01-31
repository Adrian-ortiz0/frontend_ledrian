import React from 'react'

export const PostCard = ({img, description, username}) => {
  return (
    <div className='post_card'>
        <img src={img} alt="" />
    </div>
  )
}
