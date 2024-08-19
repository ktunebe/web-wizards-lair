import { useState } from 'react'
import avatars from '../../assets/avatars.json'


const AvatarBank = ({ selectedAvatar, setSelectedAvatar, handleSelectAvatar }) => {
  
  return (
    <>
    <h4 className='text-center py-2'>Choose an Avatar</h4>
    <div className='flex flex-wrap justify-center'>
      {/* Map through all available avatars for selection box */}
      {avatars.map((avatar) => {
        return (
            <img 
              onClick={handleSelectAvatar} 
              key={avatar.name} 
              src={avatar.url} 
              alt={`Image of ${avatar.name}`}
              className={`w-1/4 rounded-lg p-2 ${selectedAvatar === avatar.url ? 'bg-lannisterGold' : ''}`}
            />
        )
      })}
    </div>
    </>
  )
}

export default AvatarBank