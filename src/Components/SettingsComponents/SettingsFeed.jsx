import React from 'react'

export const SettingsFeed = ({usuario}) => {
  return (
    <div className='settings_feed-container'>
        <h1>Settings</h1>
        <div className='settings_feed-options'>
            <button>Log out</button>
            <button>User Terms</button>
            <button id='deleteAccount'>Delete account</button>
        </div>
    </div>
  )
}
