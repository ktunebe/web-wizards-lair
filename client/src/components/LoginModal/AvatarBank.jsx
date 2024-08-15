import { useState } from 'react'
import avatars from '../../assets/avatars.json'


const AvatarBank = ({ selectedAvatar, setSelectedAvatar, handleSelectAvatar }) => {
  
  return (
    <>
    <h4 className='text-center py-2'>Choose an Avatar</h4>
    <div className='flex flex-wrap justify-center'>
      {avatars.map((avatar) => {
        return (
            <img 
              onClick={handleSelectAvatar} 
              key={avatar.name} 
              src={avatar.url} 
              alt={`Image of ${avatar.name}`}
              className={`w-1/4 rounded-lg p-2 ${selectedAvatar === avatar.url ? 'bg-lannisterGold' : ''}`}
              // style={{backgroundColor: selectedAvatar === avatar.url ? 'rgba(255, 23, 23, 0.466)' : ''}}
            />
        )
      })}
    </div>
    </>
  )
}

export default AvatarBank