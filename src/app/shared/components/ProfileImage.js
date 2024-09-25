import React from 'react';

const colors = ['#FFD700', '#FF6347', '#4682B4', '#32CD32', '#FF69B4'];

const ProfileImage = ({ firstName = '', lastName = '', spacing = '100px', textsize = '24px' }) => {
  const firstLetters = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  const style = {
    background: 'linear-gradient(#007eef, #2ae4ff)', 
    width: spacing, 
    height: spacing, 
    borderRadius: '50%', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: textsize, 
    fontWeight: 'bold'
  };

  return (
    <div style={style}>
      {firstLetters}
    </div>
  );
};

export default ProfileImage;
