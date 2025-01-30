import React from 'react'

export const Suggestions = () => {
  return (
    <div className='suggestions-container'>
        <div className='suggestions-container-card'>
            <img src="/public/profile_icon.png" alt="" width={30} height={30}/>
            <div>
                <p>Leonardo</p>
                <p>Gonzales</p>
                <label htmlFor="">@Leonardog</label>
            </div>
            <button>Follow</button>
        </div>
        <div className='suggestions-container-card'>
            <img src="/public/profile_icon.png" alt="" width={30} height={30}/>
            <div>
                <p>Leonardo</p>
                <p>Gonzales</p>
                <label htmlFor="">@Leonardog</label>
            </div>
            <button>Follow</button>
        </div>
        <div className='suggestions-container-card'>
            <img src="/public/profile_icon.png" alt="" width={30} height={30}/>
            <div>
                <p>Leonardo</p>
                <p>Gonzales</p>
                <label htmlFor="">@Leonardog</label>
            </div>
            <button>Follow</button>
        </div>  
    </div>
  )
}
