import { useState } from 'react'
import avatars from '../../assets/avatars.json'


const AvatarBank = ({ selectedAvatar, setSelectedAvatar, handleSelectAvatar }) => {
  
  return (
    <>
    <h4 className='text-center text-light'>Choose an Avatar</h4>
    <div className='row justify-center m-4'>
      {avatars.map((avatar) => {
        return (
            <img 
              onClick={handleSelectAvatar} 
              key={avatar.name} 
              src={avatar.url} 
              alt={`Image of ${avatar.name}`}
              className='col-3 rounded-lg'
              style={{backgroundColor: selectedAvatar === avatar.url ? 'rgba(255, 23, 23, 0.466)' : ''}}
            />
        )
      })}
    </div>
    </>
  )
}

export default AvatarBank